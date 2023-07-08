import ContactPage from "@/app/[lng]/contact/page";
import { fallbackLng } from "@/app/i18n/settings";
import { render } from "@/test/utils";
import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { SetupServer, setupServer } from "msw/node";

describe("ContactPage", () => {
  let server: SetupServer;

  afterEach(() => {
    server && server.close();
  });

  it("should render title", () => {
    render(<ContactPage params={{ lng: fallbackLng }} />);

    expect(screen.getByTestId("page-title")).toBeInTheDocument();
  });

  describe("Success scenarios", () => {
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

    it("should not display error when value is valid", async () => {
      render(<ContactPage params={{ lng: fallbackLng }} />);

      fireEvent.input(screen.getByTestId("email"), {
        target: {
          value: "test@gmail.com",
        },
      });

      fireEvent.input(screen.getByTestId("question"), {
        target: {
          value: "Awesome site!",
        },
      });
      fireEvent.submit(screen.getByTestId("submit"));

      expect(await screen.getByTestId("toast-title")).toBeInTheDocument();
    });
  });
});
