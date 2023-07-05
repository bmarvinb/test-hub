import ContactPage from "@/app/contact/page";
import { Toaster } from "@/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  screen,
  render as testingLibraryRender,
} from "@testing-library/react";
import { rest } from "msw";
import { SetupServer, setupServer } from "msw/node";

const render = () => {
  const queryClient = new QueryClient();
  testingLibraryRender(
    <QueryClientProvider client={queryClient}>
      <>
        <ContactPage />
        <Toaster />
      </>
    </QueryClientProvider>
  );
};

describe("ContactPage", () => {
  let server: SetupServer;

  afterEach(() => {
    server.close();
  });

  describe("Error scenarios", () => {
    beforeEach(() => {
      server = setupServer(
        rest.post("/api/contact", (_req, res, ctx) => {
          return res(
            ctx.delay(200),
            ctx.status(400),
            ctx.json({ message: "Mail server is unavailable", errors: [] })
          );
        })
      );
      server.listen();
    });

    it("should display error message after form submitted", async () => {
      render();

      const button = screen.getByRole("button", { name: /Submit/i });

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

      fireEvent.submit(button);

      expect(
        await screen.findByText(/Mail server is unavailable/i)
      ).toBeInTheDocument();
    });
  });

  describe("Successfull scenarios", () => {
    beforeEach(() => {
      server = setupServer(
        rest.post("/api/contact", (_req, res, ctx) => {
          return res(
            ctx.delay(200),
            ctx.status(200),
            ctx.json({ healthy: true })
          );
        })
      );
      server.listen();
    });

    it("should display required error when value is invalid", async () => {
      render();

      const button = screen.getByRole("button", { name: /Submit/i });

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

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(await screen.findByText(/Success/i)).toBeInTheDocument();
    });
  });
});
