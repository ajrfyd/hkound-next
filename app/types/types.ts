export type ResponsePosts = {
  status: number;
  message: string;
  result: {
    posts: Post[];
    tags: Tag[];
  };
};

export type Post = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  createdAt: string;
  views: number;
};

export type Tag = {
  id: string;
  label: string;
};
