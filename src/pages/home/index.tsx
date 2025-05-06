import { useLogout } from "@/hooks/auth/use-auth";
import { Button } from "@mantine/core";

export default function HomePage() {
  const { logout } = useLogout();
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      Home
    </div>
  );
}
