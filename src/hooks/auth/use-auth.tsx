import userRepository from "@/repositories/user/user-repository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

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
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: userRepository.login,
  });

  const login = useCallback(
    (...args: Parameters<typeof userRepository.login>) => {
      mutate(...args);
    },
    [mutate],
  );

  return {
    login,
    data,
    error,
    isPending,
  };
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
  const logout = useCallback(() => {
    // TODO: Implement logout
  }, []);

  return {
    logout,
  };
}
