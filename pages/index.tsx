import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

type Props = {
  feed: PostProps[];
};

const HomePage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Head>
        <title>Odontoeasy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Odondology blog" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="flex flex-1 md:flex-none">
        <main className="bg-lightred px-3 pt-16 pb-3 md:pt-2 flex flex-col overflow-visible content-center justify-center flex-1 md:overflow-scroll ">
          <span className="hidden text-h5 text-white font-bold md:flex">Feed</span>
          {props.feed.map((post) => (
            <div key={post.id} className="post flex-1">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const URL = `${process.env.REACT_APP_API_URL}/get/feed`;
  const res = await fetch(URL);
  const feed = await res.json();
  return { props: { feed } };
};
export default HomePage;
