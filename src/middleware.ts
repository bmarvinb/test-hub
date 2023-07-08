import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: "/:lng*",
};

const cookieName = "i18next";

export function middleware(request: NextRequest) {
  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(
      request.cookies.get(cookieName)
        ? request.cookies.get(cookieName)?.value
        : fallbackLng
    );
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
    );
  }

  if (request.headers.has("referer")) {
    const refererUrl = new URL(request.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
