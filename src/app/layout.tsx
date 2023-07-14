"use client";

import { IS_DEVELOPMENT } from "@/config/constants";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import React from "react";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "./header";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <section>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
                <Header />
                {children}
                <Toaster />
              </TooltipProvider>
            </QueryClientProvider>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
