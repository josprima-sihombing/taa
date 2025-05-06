import API from "@/utils/api";
import type { AxiosResponse } from "axios";
import type { Article, CreateArticleData, GetArticleParams } from "./types";
import type { GetListResponse, GetOneResponse } from "../common";

interface ArticleRepository {
  getList: (
    params: GetArticleParams,
  ) => Promise<AxiosResponse<GetListResponse<Article>>>;
  getOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Article>>>;
  deleteOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Article>>>;
  createOne: (
    data: CreateArticleData,
  ) => Promise<AxiosResponse<GetOneResponse<Article>>>;
  updateOne: (
    id: number,
    data: CreateArticleData,
  ) => Promise<AxiosResponse<GetOneResponse<Article>>>;
}

export const articleRepository: ArticleRepository = {
  async getList(params) {
    return API.get<GetListResponse<Article>>("/articles", { params });
  },
  async getOne(id) {
    return API.get<GetOneResponse<Article>>(`/articles/${id}`);
  },
  async deleteOne(id) {
    return API.delete<GetOneResponse<Article>>(`/articles/${id}`);
  },
  async createOne(data) {
    return API.post<GetOneResponse<Article>>("/articles", data);
  },
  async updateOne(id, data) {
    return API.put<GetOneResponse<Article>>(`/articles/${id}`, data);
  },
};
