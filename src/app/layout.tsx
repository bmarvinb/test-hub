"use client";

import { IS_PRODUCTION } from "@/config/constants";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

if (!IS_PRODUCTION) {
  import("@/mocks").then(({ initializeMocks }) => initializeMocks());
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/tests">Tests</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>

          <main>{children}</main>
        </section>
      </body>
    </html>
  );
}
