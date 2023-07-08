"use client";

import { IS_DEVELOPMENT } from "@/config/constants";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import React from "react";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <section>
          <QueryClientProvider client={queryClient}>
            {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
            {children}
            <Toaster />
          </QueryClientProvider>
        </section>
      </body>
    </html>
  );
}
