import API from "@/utils/api";
import type { AxiosResponse } from "axios";
import type { CreateCommentData, GetCommentParams, Comment } from "./types";
import type { GetListResponse, GetOneResponse } from "@/repositories/common";

interface CommentRepository {
  getList: (
    params: GetCommentParams,
  ) => Promise<AxiosResponse<GetListResponse<Comment>>>;
  getOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Comment>>>;
  deleteOne: (id: number) => Promise<AxiosResponse<GetOneResponse<Comment>>>;
  createOne: (
    data: CreateCommentData,
  ) => Promise<AxiosResponse<GetOneResponse<Comment>>>;
  updateOne: (
    id: number,
    data: CreateCommentData,
  ) => Promise<AxiosResponse<GetOneResponse<Comment>>>;
}

export const commentRepository: CommentRepository = {
  async getList(params) {
    return API.get<GetListResponse<Comment>>("/comments", { params });
  },
  async getOne(id) {
    return API.get<GetOneResponse<Comment>>(`/comments/${id}`);
  },
  async deleteOne(id) {
    return API.delete<GetOneResponse<Comment>>(`/comments/${id}`);
  },
  async createOne(data) {
    return API.post<GetOneResponse<Comment>>("/comments", data);
  },
  async updateOne(id, data) {
    return API.put<GetOneResponse<Comment>>(`/comments/${id}`, data);
  },
};
