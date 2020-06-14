
import React, {useState} from 'react';
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { NextApiRequest } from 'next'
import { request } from 'http';

type Props = {
  feed: PostProps[]
}

const HomePage: React.FC<Props> = props => {
 
  return (
      <Layout>
        <Head>
        <title>Odontoeasy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Odondology blog" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page">
        <main>
          {props.feed.map(post => (
            <div key={post.id} className="post">
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

        main {
          margin-top: 2rem;
        }
      `}</style>
      </Layout>  
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = (path: string, req?: NextApiRequest) => {
    if (!req && typeof window !== "undefined") return path;
    const host = req
      ? req.headers["x-forwarded-host"] || req.headers.host
      : window.location.host;
    const proto = req
      ? req.headers["x-forwarded-proto"] || "http"
      : window.location.protocol.slice(0, -1);
    return `${proto}://${host}${path}`;
  };
    const res = await fetch(apiUrl("/api/feed"));
    const feed = await res.json();
    return { props: { feed } };
  }


export default HomePage;
