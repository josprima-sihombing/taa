import { redirect } from "react-router";

export async function protectedRouteLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  return { token };
}

export async function guestRouteLoader() {
  const token = localStorage.getItem("token");

  if (token) {
    return redirect("/");
  }

  return {};
}
