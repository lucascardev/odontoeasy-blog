import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import Post, { PostProps } from '../components/Post'


type Props = {
  drafts: PostProps[]
}

const Drafts : React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <main>
          {props.drafts.map(post => (
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
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const URL = `${process.env.REACT_APP_API_URL}/get/drafts`;
  const res = await fetch(URL);
  const drafts = await res.json();
  return { props: { drafts } };
}

export default Drafts