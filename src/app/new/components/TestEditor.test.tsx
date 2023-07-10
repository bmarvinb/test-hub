import { render } from "@/test/utils";
import { act, fireEvent, screen } from "@testing-library/react";
import { TestEditor } from "./TestEditor";

describe("TestEditor", () => {
  it("should display error messages if form is empty", async () => {
    const onSubmit = jest.fn();
    render(<TestEditor onSubmit={onSubmit} />);

    fireEvent.click(await screen.getByRole("button", { name: /Create/i }));

    expect(
      await screen.findByText(/Title cannot be empty/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Description cannot be empty/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show error toast if user tries to submit form without questions", async () => {
    const onSubmit = jest.fn();
    render(<TestEditor onSubmit={onSubmit} />);
    const button = await screen.getByRole("button", { name: /Create/i });

    fireEvent.change(await screen.findByLabelText(/Title/i), {
      target: { value: "Test" },
    });
    fireEvent.change(await screen.findByLabelText(/Description/i), {
      target: { value: "Test" },
    });
    fireEvent.click(button);

    expect(await screen.findByText(/Invalid form/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  describe("Test with single choise based question", () => {
    it("should show success toast if test was created", async () => {
      const onSubmit = jest.fn();
      render(<TestEditor onSubmit={onSubmit} />);

      fireEvent.change(await screen.findByLabelText(/Title/i), {
        target: { value: "Test title" },
      });
      fireEvent.change(await screen.findByLabelText(/Description/i), {
        target: { value: "Description of my test" },
      });
      fireEvent.click(
        await screen.findByRole("button", { name: /Add question/i })
      );

      fireEvent.change(await screen.findByTestId("question"), {
        target: { value: "New question" },
      });

      fireEvent.change(await screen.getByTestId("options.0.option"), {
        target: { value: "Option 1" },
      });
      fireEvent.click(await screen.getByTestId("options.0.mark-as-answer"));

      fireEvent.click(
        await screen.findByRole("button", { name: /Add option/i })
      );

      fireEvent.change(await screen.getByTestId("options.1.option"), {
        target: { value: "Option 2" },
      });

      await act(async () => {
        fireEvent.click(await screen.getByTestId("choice-based-submit-button"));
      });

      await act(async () => {
        fireEvent.click(await screen.getByRole("button", { name: /Create/i }));
      });

      expect(await screen.findByText(/Test created/i)).toBeInTheDocument();
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
