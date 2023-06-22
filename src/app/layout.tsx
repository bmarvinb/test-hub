"use client";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "@/config/constants";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

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
