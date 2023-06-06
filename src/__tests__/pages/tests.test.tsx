import { render, screen } from "@testing-library/react";
import Tests from "@/pages/tests";

describe("Tests", () => {
  it("renders a heading", () => {
    render(<Tests tests={[]} />);

    const heading = screen.getByRole("heading", {
      name: /Tests/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
