import userRepository, {
  type User,
  type UserCredential,
  type UserLoginResponse,
} from "@/repositories/user/user-repository";
import { formatAPIError, type ApiRequestError } from "@/utils/format-api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const TOKEN_KEY = "token";

export function useRegister() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: userRepository.register,
  });

  const register = useCallback(
    (...args: Parameters<typeof userRepository.register>) => {
      mutate(...args);
    },
    [mutate],
  );

  return {
    register,
    data,
    error,
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
    (data: Pick<User, "email" | "password">) => {
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
