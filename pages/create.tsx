import React, { useState, useContext } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Router from 'next/router'
import dynamic from 'next/dynamic';
import myapi from '../services/myapi'
import { AuthContext } from '../contexts/authenticantion.context'
import MarkdownIt from 'markdown-it'
import Error from './_error'


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Draft: React.FC = () => {
  const { loading, user, signed } = useContext(AuthContext);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [authorEmail, setAuthorEmail] = useState(user?.email)
  
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, description, authorEmail }
      const res = await myapi.post(`${process.env.REACT_APP_API_URL}/posts/create`, body)
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  function handleEditorChange({html, text}) {    
    setContent(html);
  }

  return (
    <Layout>
      { signed ? <>
      <div className='bg-white flex flex-1 justify-center items-center'>
        <form
          className='w-full p-8'
          onSubmit={submitData}>
          <span className='text-h4'>Create Draft</span>
          <input
            autoFocus
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
           <input
            autoFocus
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            value={description}
          />
          <input
            onChange={e => setAuthorEmail(e.target.value)}
            placeholder="Author (email address)"
            type="text"
            value={authorEmail}
          />
          <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
          <input
            disabled={!content||!description ||!title ||!authorEmail}
            type="submit"
            value="Create"
          />
           
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }
        .back {u
          margin-left: 1rem;
        }
      `}</style>u
    </> : <div className='bg-white flex flex-1 justify-center items-center'><Error statusCode={403} /></div>}
    </Layout>
  )
}

export default Draft;