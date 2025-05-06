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
import { useRegister, useRegisterForm } from "@/hooks/auth/use-auth";
import { IconAlertCircle } from "@tabler/icons-react";
import { NavLink } from "react-router";

export default function RegisterPage() {
  const { register, isPending, error: apiError } = useRegister();
  const { handleSubmit, control, errors } = useRegisterForm();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Create an account
        </Title>

        <form onSubmit={handleSubmit(register)}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isPending}
                error={errors.username?.message}
                label="Username"
                placeholder="John"
                size="md"
                radius="md"
              />
            )}
          />

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
                mt="md"
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInput
                {...field}
                disabled={isPending}
                error={errors.confirmPassword?.message}
                label="Confirm Password"
                placeholder="Confirm password"
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
            Create account
          </Button>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={NavLink} to="/login" fw={500}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
