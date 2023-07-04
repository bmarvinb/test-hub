import ContactPage from "@/app/contact/page";
import { Toaster } from "@/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  screen,
  render as testingLibraryRender,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("/api/contact", (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json({ healthy: true }));
  })
);

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const render = () => {
  testingLibraryRender(
    <QueryClientProvider client={queryClient}>
      <div>
        <ContactPage />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

test("page title", async () => {
  render();

  expect(screen.queryByText("Contact us")).toBeInTheDocument();
});

it("should display required error when value is invalid", async () => {
  render();

  const button = screen.getByRole("button");

  fireEvent.submit(button);

  expect(
    await screen.findByText("Please enter a valid email address.")
  ).toBeInTheDocument();
});

it("should not display error when value is valid", async () => {
  render();

  fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
    target: {
      value: "test@mail.com",
    },
  });

  fireEvent.input(screen.getByLabelText("Question"), {
    target: {
      value: "Awesome site!",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findByText(/Success/i)).toBeInTheDocument();
});
