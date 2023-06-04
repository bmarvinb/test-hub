import { render, screen } from "@testing-library/react";
import New from "@/pages/new";

describe("New", () => {
  it("renders a heading", () => {
    render(<New />);

    const heading = screen.getByRole("heading", {
      name: /New/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
