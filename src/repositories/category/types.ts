export type GetCategoryParams = {
  page: number;
  limit: number;
  name: string;
};

export type CreateCategoryData = {
  name: string;
  description: string | null;
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
