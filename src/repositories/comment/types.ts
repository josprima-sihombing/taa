export type GetCommentParams = {
  page: number;
  limit: number;
  articleId: number;
};

export type CreateCommentData = {
  content: string;
  articleId: number;
};

export type Comment = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
