import { LoadingOverlay } from "@mantine/core";

export default function PageLoader() {
  return (
    <LoadingOverlay
      visible
      overlayProps={{ fixed: true }}
      loaderProps={{ type: "dots" }}
    />
  );
}
