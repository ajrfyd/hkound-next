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

export type User = {
  id: string | null;
  nickname: string | undefined;
  role: UserRole;
};

export const enum UserRole {
  "admin",
  "user",
}

export type Room = {
  id: string;
  users: User[];
};

export type Message = {
  id: string;
  message: string;
  createdAt: string;
  owner: User;
  room: {
    id: string;
  };
};
