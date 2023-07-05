import { Toaster } from "@/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";

export function render(ui: React.ReactElement) {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <>
        {ui}
        <Toaster />
      </>
    </QueryClientProvider>
  );
}
