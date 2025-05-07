import { useUserStore } from "@/stores/auth-store";
import { redirect } from "react-router";

export async function protectedRouteLoader() {
  const user = useUserStore.getState().user;

  if (!user) {
    return redirect("/login");
  }

  return user;
}

export async function guestRouteLoader() {
  const user = useUserStore.getState().user;

  if (user) {
    return redirect("/");
  }

  return {};
}
