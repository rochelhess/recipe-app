/** @jest-environment node */
import handler from "@/pages/api/recipes/index";
import Recipe from "@/models/Recipe";
import { getUserIdFromRequest } from "@/lib/auth";

jest.mock("@/lib/mongodb", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("@/models/Recipe", () => ({
  __esModule: true,
  default: { find: jest.fn(), create: jest.fn() },
}));
jest.mock("@/lib/auth", () => ({ getUserIdFromRequest: jest.fn() }));

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  return res;
}

describe("/api/recipes", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns the list of recipes on GET", async () => {
    const recipes = [{ id: "1", title: "Pizza" }];
    Recipe.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(recipes) });
    const res = mockRes();

    await handler({ method: "GET" }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(recipes);
  });

  it("rejects POST when not logged in", async () => {
    getUserIdFromRequest.mockReturnValue(null);
    const res = mockRes();

    await handler({ method: "POST", body: { title: "Pizza" } }, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(Recipe.create).not.toHaveBeenCalled();
  });

  it("creates a recipe owned by the logged-in user, ignoring a fake owner", async () => {
    getUserIdFromRequest.mockReturnValue("user123");
    Recipe.create.mockResolvedValue({ id: "r1", title: "Pizza" });
    const res = mockRes();

    await handler(
      { method: "POST", body: { title: "Pizza", owner: "someone-else" } },
      res,
    );

    expect(Recipe.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Pizza", owner: "user123" }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
