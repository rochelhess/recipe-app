/** @jest-environment node */
import handler from "@/pages/api/recipes/[id]";
import Recipe from "@/models/Recipe";
import { getUserIdFromRequest } from "@/lib/auth";

jest.mock("@/lib/mongodb", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("@/models/Recipe", () => ({
  __esModule: true,
  default: { findById: jest.fn() },
}));
jest.mock("@/lib/auth", () => ({ getUserIdFromRequest: jest.fn() }));

const VALID_ID = "507f1f77bcf86cd799439011";

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  return res;
}

function recipeOwnedBy(ownerId) {
  return {
    owner: { toString: () => ownerId },
    deleteOne: jest.fn().mockResolvedValue(),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(),
  };
}

describe("/api/recipes/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 404 for an invalid id", async () => {
    const res = mockRes();

    await handler({ method: "GET", query: { id: "not-an-id" } }, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("returns 401 when deleting while logged out", async () => {
    getUserIdFromRequest.mockReturnValue(null);
    const res = mockRes();

    await handler({ method: "DELETE", query: { id: VALID_ID } }, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("returns 403 when a non-owner tries to delete", async () => {
    getUserIdFromRequest.mockReturnValue("user123");
    const recipe = recipeOwnedBy("someone-else");
    Recipe.findById.mockResolvedValue(recipe);
    const res = mockRes();

    await handler({ method: "DELETE", query: { id: VALID_ID } }, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(recipe.deleteOne).not.toHaveBeenCalled();
  });

  it("lets the owner delete their recipe", async () => {
    getUserIdFromRequest.mockReturnValue("user123");
    const recipe = recipeOwnedBy("user123");
    Recipe.findById.mockResolvedValue(recipe);
    const res = mockRes();

    await handler({ method: "DELETE", query: { id: VALID_ID } }, res);

    expect(recipe.deleteOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
