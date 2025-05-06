import { createBrowserRouter, RouterProvider } from "react-router";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { guestRouteLoader, protectedRouteLoader } from "@/utils/auth-loader";
import PageLoader from "@/components/page-loader";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        loader: protectedRouteLoader,
        children: [
          {
            index: true,
            lazy: {
              Component: async () => (await import("@/pages/home")).default,
            },
          },
        ],
      },
      {
        path: "/login",
        loader: guestRouteLoader,
        lazy: {
          Component: async () => (await import("@/pages/login")).default,
        },
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
