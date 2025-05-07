import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router";

import classes from "./DashboardLayout.module.css";
import { ActionIcon } from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import classnames from "classnames";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const layoutClassName = useMemo(
    () =>
      classnames(classes.layout, {
        [classes.layout__open]: open,
      }),
    [open],
  );

  return (
    <div className={layoutClassName}>
      <aside className={open ? classes.__open : ""}>
        <Navbar />

        <ActionIcon
          className={classes.toggle}
          variant="white"
          color="gray"
          size="lg"
          onClick={toggle}
        >
          <IconMenu />
        </ActionIcon>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
