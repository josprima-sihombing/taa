import API from "@/utils/api";
import type { AxiosResponse } from "axios";

interface UserRepository {
  register: (
    userData: UserRegisterData,
  ) => Promise<AxiosResponse<UserLoginResponse>>;
  login: (
    userCredential: UserCredential,
  ) => Promise<AxiosResponse<UserLoginResponse>>;
  getDetail: () => Promise<UserDetail>;
}

const userRepository: UserRepository = {
  async register(userData) {
    return API.post<UserLoginResponse>("/auth/local/register", userData);
  },
  async login(credential) {
    return API.post<UserLoginResponse>("/auth/local", credential);
  },
  async getDetail() {
    return API.get("/users/me");
  },
};

export default userRepository;

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserCredential = Pick<User, "password"> & {
  identifier: string;
};

export type UserRegisterData = Pick<User, "email" | "password" | "username">;

export type UserDetail = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type UserLoginResponse = {
  jwt: string;
  user: UserDetail;
};
