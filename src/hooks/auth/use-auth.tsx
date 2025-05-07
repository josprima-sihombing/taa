import userRepository, {
  type UserCredential,
  type UserLoginResponse,
  type UserRegisterData,
} from "@/repositories/user/user-repository";
import { useUserStore } from "@/stores/auth-store";
import { formatAPIError, type ApiRequestError } from "@/utils/format-api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export const TOKEN_KEY = "token";

const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function useRegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  return { handleSubmit, control, errors };
}

export function useRegister() {
  const navigate = useNavigate();
  const [formattedError, setFormattedError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const { data, mutate, isPending } = useMutation<
    AxiosResponse<UserLoginResponse>,
    AxiosError<ApiRequestError>,
    UserRegisterData
  >({
    mutationFn: userRepository.register,
  });

  const register = useCallback(
    (data: z.infer<typeof registerSchema>) => {
      setFormattedError(null);

      mutate(
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          onError: (error) => {
            setFormattedError(formatAPIError(error));
          },
          onSuccess: (response) => {
            const { user, jwt } = response.data;

            setUser({
              id: user.id,
              username: user.username,
              email: user.email,
              token: jwt,
            });

            notifications.show({
              color: "green",
              title: "Success",
              message: "Account created successfully",
            });
            navigate("/", {
              replace: true,
            });
          },
        },
      );
    },
    [mutate, navigate, setUser],
  );

  return {
    register,
    data,
    error: formattedError,
    isPending,
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const [formattedError, setFormattedError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const { data, mutate, isPending } = useMutation<
    AxiosResponse<UserLoginResponse>,
    AxiosError<ApiRequestError>,
    UserCredential
  >({
    mutationFn: userRepository.login,
  });

  const login = useCallback(
    (data: z.infer<typeof loginSchema>) => {
      setFormattedError(null);

      mutate(
        {
          identifier: data.email,
          password: data.password,
        },
        {
          onError: (error) => {
            setFormattedError(formatAPIError(error));
          },
          onSuccess: (response) => {
            const { user, jwt } = response.data;

            setUser({
              id: user.id,
              username: user.username,
              email: user.email,
              token: jwt,
            });

            notifications.show({
              color: "green",
              title: "Welcome!",
              message: "Login successful",
            });

            navigate("/", {
              replace: true,
            });
          },
        },
      );
    },
    [mutate, navigate, setUser],
  );

  return {
    login,
    data,
    error: formattedError,
    isPending,
  };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function useLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { handleSubmit, control, errors };
}

export function useUserDetail() {
  const { isPending, data, error } = useQuery({
    queryKey: [""],
    queryFn: userRepository.getDetail,
  });

  return {
    isPending,
    data,
    error,
  };
}

export function useLogout() {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    clearUser();
    navigate("/login", {
      replace: true,
    });

    notifications.show({
      color: "green",
      title: "Success",
      message: "Logout successfully",
    });
  }, [navigate, clearUser]);

  return {
    logout,
  };
}
