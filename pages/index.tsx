
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


  const URL = `${process.env.REACT_APP_API_URL}/get/feed`
    const res = await fetch(URL);
    const feed = await res.json();
    return { props: { feed } };
  }
export default HomePage;
