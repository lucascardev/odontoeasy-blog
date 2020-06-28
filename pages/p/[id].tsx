import React, { useState, useContext } from 'react'
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { PostProps } from '../../components/Post'
import myapi from '../../services/myapi'
import { AuthContext } from '../../contexts/authenticantion.context'

async function publish(id: number): Promise<void> {
  const res = await myapi.put(`${process.env.REACT_APP_API_URL}/put/posts/publish/${id}`)
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  const res = await myapi.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${id}`)
  Router.push('/')
}

const Post: React.FC<PostProps> = props => {
  const { loading, user, signed } = useContext(AuthContext);
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
      <div className="bg-lightred flex flex-1 flex-col p-8">
        <h2 className="text-h6 flex flex-1 text-white">{title}</h2>
        <p className="text-white">By {props?.author?.name || 'Unknown author'}</p>
        <div className="bg-white py-8 px-1 my-8">
        <ReactMarkdown source={props.content} escapeHtml={false} />
        </div>
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