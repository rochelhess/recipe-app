import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar", () => {
  it("shows Log in and Register when logged out", () => {
    useAuth.mockReturnValue({ user: null, loading: false, logout: jest.fn() });
    render(<Navbar />);

    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Add Recipe")).not.toBeInTheDocument();
  });

  it("shows the user's name, Add Recipe, and Log out when logged in", () => {
    useAuth.mockReturnValue({
      user: { id: "1", name: "Sam" },
      loading: false,
      logout: jest.fn(),
    });
    render(<Navbar />);

    expect(screen.getByText("Hello, Sam")).toBeInTheDocument();
    expect(screen.getByText("Add Recipe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log out/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Log in")).not.toBeInTheDocument();
  });
});
