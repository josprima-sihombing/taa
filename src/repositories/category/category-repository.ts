import API from "@/utils/api";
import type { AxiosResponse } from "axios";
import type { Category, CreateCategoryData, GetCategoryParams } from "./types";
import type { GetListResponse, GetOneResponse } from "@/repositories/common";

interface CategoryRepository {
  getList: (
    params: GetCategoryParams,
  ) => Promise<AxiosResponse<GetListResponse<Category>>>;
  getOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Category>>>;
  deleteOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Category>>>;
  createOne: (
    data: CreateCategoryData,
  ) => Promise<AxiosResponse<GetOneResponse<Category>>>;
  updateOne: (
    id: number,
    data: CreateCategoryData,
  ) => Promise<AxiosResponse<GetOneResponse<Category>>>;
}

export const categoryRepository: CategoryRepository = {
  async getList(params) {
    return API.get<GetListResponse<Category>>("/categories", { params });
  },
  async getOne(id) {
    return API.get<GetOneResponse<Category>>(`/categories/${id}`);
  },
  async deleteOne(id) {
    return API.delete<GetOneResponse<Category>>(`/categories/${id}`);
  },
  async createOne(data) {
    return API.post<GetOneResponse<Category>>("/categories", data);
  },
  async updateOne(id, data) {
    return API.put<GetOneResponse<Category>>(`/categories/${id}`, data);
  },
};
