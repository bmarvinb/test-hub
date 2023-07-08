import { Toaster } from "@/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export function render(ui: React.ReactElement) {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        {ui}
        <Toaster />
      </I18nextProvider>
    </QueryClientProvider>
  );
}
