import { MetadataRoute } from "next";
import { type Post } from "./types/types";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
    credentials: "include",
    next: {
      revalidate: 300,
    },
  });
  console.log(res.ok);
  const posts: Post[] = await res.json();
  console.log(posts);

  if (!res.ok) return [];

  return posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${post.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: post.body.length > 500 ? 0.8 : 0.7,
  }));
};

export default sitemap;
