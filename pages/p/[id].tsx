import React, { useState } from 'react'
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { PostProps } from '../../components/Post'
import myapi from '../../services/myapi'

async function publish(id: number): Promise<void> {
  const res = await myapi.put(`${process.env.REACT_APP_API_URL}/put/posts/publish/${id}`)
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  const res = await myapi.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${id}`)
  Router.push('/')
}

const Post: React.FC<PostProps> = props => {

  const [PostID, setPostID] = useState(props.id);
 
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
        <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content={props?.author?.name || 'Unknown author'} />
        {/* <meta name="description" content=""> */}
        <meta name="keywords" content="odontology, odontologia, post" />
      </Head>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown source={props.content} />
        {!props.published && (
          <button onClick={()=> publish(props.id)}>
            Publish
          </button>
        )}
        <button onClick={()=> destroy(props.id)}>
          Delete
        </button>
      </div>
      <div id="disqus_thread"></div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${context.params.id}`)
  const data = await res.json()
  return {props: { ...data }}
}

export default Post