import { IconGauge } from "@tabler/icons-react";
import {
  Button,
  Code,
  Group,
  Modal,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { LinksGroup } from "./LinksGroup";
import { UserButton } from "./UserButton";

import classes from "./Navbar.module.css";
import { APP_VERSION } from "@/utils/app-version";
import { useMemo } from "react";
import { useUserStore } from "@/stores/auth-store";
import { useDisclosure } from "@mantine/hooks";
import { useLogout } from "@/hooks/auth/use-auth";

const menus = [{ label: "Articles", icon: IconGauge }];

export function Navbar() {
  const { logout } = useLogout();
  const user = useUserStore((state) => state.user);
  const links = useMemo(
    () => menus.map((item) => <LinksGroup {...item} key={item.label} />),
    [],
  );

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Title order={5}>Travel Article App</Title>
          <Code fw={700}>{APP_VERSION}</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton name={user?.username} email={user?.email} onClick={open} />
      </div>

      <Modal opened={opened} onClose={close} title="Confirmation">
        <Text>Are you sure you want to logout?</Text>

        <Group mt="xl">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={logout} variant="filled">
            Logout
          </Button>
        </Group>
      </Modal>
    </nav>
  );
}
