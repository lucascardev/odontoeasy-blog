import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import theme from "../config/theme";
import { FiEye } from "react-icons/fi";
import moment from 'moment';

export type PostProps = {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: Date;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author"
  const createdAt = post.createdAt
  const dateformated = moment(createdAt).toDate().toDateString();
  return (
    <>
      <header className="post-header">
        <div className="post-info">
          <span className="post-title">{post.title}</span>
          <span className="post-description"> <ReactMarkdown source={post.description} /></span>
          <small>
          By {authorName}
        </small>
        <small>
        Created at {dateformated} 
        </small>
        </div>
        <span className="link" onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
          <FiEye size={26} />
        </span>
      </header>
      <style jsx>{`
        div {
          color: inherit;
        }
        .post-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0.3rem;
          background: ${theme.colors.primarycolor};
        }
        .post-info {
            display: flex;
            flex-direction: column;
            padding: 0.3rem;
        }
        small {
            color: ${theme.colors.white};
        }
        .post-title {
          color: ${theme.colors.white};
          font-size: 1.4em;
        }
        .post-description {
          color: ${theme.colors.white};
          font-size: 1em;
        }
        .link-holder {
            
        }
        .link {
          display: flex;
          padding: 0.8rem;
          border-radius: 0.3rem;
          background: ${theme.colors.secondarycolor};
          transition: 0.2s;
          color: ${theme.colors.white};
        }
        span:hover {
          cursor: pointer;
          background: ${theme.colors.white};
          transition: 0.2s;
          color: ${theme.colors.primarycolor};
        }
      `}</style>
    </>
  );
};

export default Post;
