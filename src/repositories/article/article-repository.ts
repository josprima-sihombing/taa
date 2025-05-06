import API from "@/utils/api";
import type { AxiosResponse } from "axios";

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

export type GetArticleParams = {
  page: number;
  limit: number;
  title: string;
  category: string;
};

export type CreateArticleData = {
  title: string;
  description: string;
  cover_image_url: string;
  category: string;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type GetOneResponse<T> = {
  data: T;
};

export type GetListResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
