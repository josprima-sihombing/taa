import { createBrowserRouter, RouterProvider } from "react-router";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: {
      Component: async () => (await import("@/pages/login")).default,
    },
  },
]);

export default function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
