import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render as testingLibraryRender,
  screen,
  waitFor,
} from "@testing-library/react";
import ContactPage from "@/app/contact/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { Toaster } from "@/components/ui/Toaster";

const server = setupServer(
  rest.post("/api/contact", (req, res, ctx) => {
    return res(ctx.delay(400), ctx.status(200), ctx.json({ healthy: true }));
  })
);

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const render = () => {
  testingLibraryRender(
    <QueryClientProvider client={queryClient}>
      <ContactPage />
      <Toaster />
    </QueryClientProvider>
  );
};

test("attempt to send empty form should show errors", async () => {
  render();

  const submitButton = screen.getByRole("button", { name: /Submit/i });

  userEvent.click(submitButton);
  await waitFor(() => {
    const emailError = screen.queryByText(
      "Please enter a valid email address."
    );
    expect(emailError).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});

test("fill form valid data and submit", async () => {
  render();

  const emailInput = screen.getByLabelText("Email");
  const questionInput = screen.getByLabelText("Question");
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  userEvent.type(emailInput, "test@test.com");
  userEvent.type(questionInput, "Example question");

  userEvent.click(submitButton);

  expect(submitButton).not.toBeDisabled();
});
