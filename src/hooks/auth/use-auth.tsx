import userRepository, {
  type UserCredential,
  type UserLoginResponse,
  type UserRegisterData,
} from "@/repositories/user/user-repository";
import { formatAPIError, type ApiRequestError } from "@/utils/format-api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const TOKEN_KEY = "token";

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
  const [, setToken] = useLocalStorage({ key: TOKEN_KEY });

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
            setToken(response.data.jwt);
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
    [mutate, setToken, navigate],
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
  const [, setToken] = useLocalStorage({ key: TOKEN_KEY });

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
            setToken(response.data.jwt);
            navigate("/", {
              replace: true,
            });
          },
        },
      );
    },
    [mutate, setToken, navigate],
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
  const [, , removeValue] = useLocalStorage({ key: TOKEN_KEY });
  const navigate = useNavigate();

  const logout = useCallback(() => {
    removeValue();
    navigate("/login", {
      replace: true,
    });
  }, [removeValue, navigate]);

  return {
    logout,
  };
}
