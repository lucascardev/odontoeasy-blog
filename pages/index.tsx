
import React, {useState} from 'react';
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'


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

export const getServerSideProps: GetServerSideProps = async ctx => {
 
  if (ctx.req) {
    const dev = process.env.NODE_ENV !== 'production';
    const host = ctx.req.headers['x-forwarded-host'];
    const proto = ctx.req.headers['x-forwarded-proto'];
    const port =  ctx.req.headers['x-forwarded-port'];
    const apihttps = `${proto}//${host}:${port}`
    const server = dev ? 'http://localhost:3000' : apihttps;
    const res = await fetch(`${server}/api/feed`)
    console.log('https:'+apihttps)
    const feed = await res.json();
    return { props: { feed } };
  } else {
    // otherwise we are in the browser
    const res = await fetch(`http://localhost:3000/api/feed`);
    const feed = await res.json();
    return { props: { feed } };
  }
}

export default HomePage;
