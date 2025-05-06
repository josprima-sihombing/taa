import {
  Alert,
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import classes from "./login.module.css";
import { useLogin, useLoginForm } from "@/hooks/auth/use-auth";
import { IconAlertCircle } from "@tabler/icons-react";

export default function LoginPage() {
  const { login, isPending, error: apiError } = useLogin();
  const { handleSubmit, control, errors } = useLoginForm();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back!
        </Title>

        <form onSubmit={handleSubmit(login)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isPending}
                error={errors.email?.message}
                label="Email address"
                placeholder="hello@gmail.com"
                size="md"
                radius="md"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                disabled={isPending}
                error={errors.password?.message}
                label="Password"
                placeholder="Your password"
                mt="md"
                size="md"
                radius="md"
              />
            )}
          />

          {apiError && (
            <Alert
              variant="light"
              color="red"
              title="Error"
              icon={<IconAlertCircle />}
              mt="md"
            >
              {apiError}
            </Alert>
          )}

          <Button
            disabled={isPending}
            loading={isPending}
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            type="submit"
          >
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
