import React from "react";
import FluidSection from "./FluidSection";
import { Post } from "@/types/types";
import { transformDateHandler } from "@/utils/utils";

type PostInfoSectionProps = {
  post: Post;
};

const PostInfoSection = ({ post }: PostInfoSectionProps) => {
  return (
    <FluidSection>
      <div className="row g-0 g-lg-5 align-items-end">
        <div className="col-12 col-lg-6 order-lg-1 col-xl-3">
          <div className="styled-box">
            <h5>Tags:</h5>
            <ul className="list-inline-sm">
              {post.tags.map((tag) => (
                <li key={tag.id}>
                  <a href="javascript:;">#{tag.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-lg-6 order-lg-3 col-xl-3">
          <div className="styled-box style-2">
            <h5>Views:</h5>
            <a href="javascript:;">{post.views}</a>
          </div>
        </div>

        <div className="col-12 col-lg-6 order-lg-2 col-xl-3">
          <div className="styled-box ">
            <h5>Category:</h5>
            <a href="javascript:;">Post</a>
          </div>
        </div>

        <div className="col-12 col-lg-6 order-lg-4 col-xl-3">
          <div className="styled-box style-2">
            <h5>Posted on:</h5>
            <a href="javascript:;">{transformDateHandler(post.createdAt)}</a>
          </div>
        </div>
      </div>
    </FluidSection>
  );
};

export default PostInfoSection;
