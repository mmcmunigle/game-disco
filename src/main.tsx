import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000, // 5min
      staleTime: 10 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
