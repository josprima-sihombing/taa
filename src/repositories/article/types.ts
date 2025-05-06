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
