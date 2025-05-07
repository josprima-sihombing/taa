import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router";

import classes from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  return (
    <div className={classes.layout}>
      <div>
        <Navbar />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
