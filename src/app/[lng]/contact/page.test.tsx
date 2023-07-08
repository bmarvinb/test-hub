import ContactPage from "@/app/[lng]/contact/page";
import { fallbackLng } from "@/app/i18n/settings";
import { render } from "@/test/utils";
import { screen } from "@testing-library/react";
import { SetupServer } from "msw/node";

describe("ContactPage", () => {
  let server: SetupServer;

  afterEach(() => {
    server && server.close();
  });

  it("should render title", () => {
    render(<ContactPage params={{ lng: fallbackLng }} />);

    expect(screen.getByTestId("page-title")).toBeInTheDocument();
  });
});
