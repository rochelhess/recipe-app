import { render, screen } from "@testing-library/react";
import RecipeCard from "@/components/RecipeCard";

describe("RecipeCard", () => {
  const props = {
    id: "abc123",
    title: "Pizza",
    description: "A cheesy classic",
    image: "https://example.com/pizza.jpg",
  };

  it("shows the title, description, and image", () => {
    render(<RecipeCard {...props} />);

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("A cheesy classic")).toBeInTheDocument();
    expect(screen.getByAltText("Pizza")).toHaveAttribute("src", props.image);
  });

  it("links to the recipe details page", () => {
    render(<RecipeCard {...props} />);

    expect(screen.getByRole("link", { name: /view recipe/i })).toHaveAttribute(
      "href",
      "/recipes/abc123",
    );
  });
});
