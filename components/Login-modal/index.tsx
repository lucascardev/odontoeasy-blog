import React, { useState, useContext } from "react"
import { Modal } from "react-bootstrap"
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
import { FaArrowLeft, FaGoogle } from 'react-icons/fa'
import theme from '../../config/theme'
import { AuthContext } from '../../contexts/authenticantion.context'

type Props = {
  title: string
}

const Loginmodal: React.FC<Props> = ({children, title}) => {
  const { signIn, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleSignup = () => setShow(true)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const signinresponse = signIn({email, password});
      console.log('signin response is: '+ signinresponse)
      Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <a onClick={handleSignup}>{title}</a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{background: theme.colors.primarycolor}} closeButton >
          <Modal.Title style={{background: theme.colors.primarycolor, color:  theme.colors.white}} id="modal-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: theme.colors.secondarycolor}} id="modal-body">
          <form onSubmit={submitData}>
          <span className="text-h5 text-white">With email</span>
          <input
          required
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          type="text"
          value={email}
        />
          <input
          required
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <input
          disabled={!email || !password}
          type="submit"
          value="Login"
        />
         <hr className="divisor"/>
        <h3 className="divisor text-h5">or</h3>
         <Link href="/api/login">
           <a className="googlesign" >
             <FaGoogle size={25}/>Sign in with Social</a>
          </Link>
          <Link href="#">
          <a className="back" href="#" onClick={() => handleClose()}>
          <FaArrowLeft size={25}/><span>go back</span>
          </a> 
          </Link>
          </form>
        </Modal.Body>
      </Modal>
      <style jsx>{`
     #modal-title {
        color: ${theme.colors.white}
      }
      #modal-body {
        background: ${theme.colors.secondarycolor};
      }
      h3 {
        color: ${theme.colors.white}
      }
      form {
        padding: 1rem 2rem;
        background: ${theme.colors.secondarycolor};
      }
      .options-holder {
        display: flex;
        flex-direction: column;
      }
      input[type='text'], input[type='password'] {
        width: 100%;
        background: ${theme.colors.secondarycolor};
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 0.15rem;
        border: none;
        border-bottom: 0.125rem solid ${theme.colors.white};
      }
      input[type='text']::placeholder, input[type='password']::placeholder  {
        color: ${theme.colors.white};
      }
      input[type='submit'] {
        background: #ececec;
        border: 0;
        padding: 1rem 2rem;
        transition: 0.3s;
        margin: 0.5rem 0;
        color:  ${theme.colors.black};
      }
      input[type='submit']:disabled:hover {
        background: #ececec;
        color:  ${theme.colors.black};
        cursor: not-allowed;
      }
      input[type='submit']:hover {
        background: ${theme.colors.secondarycolor};
        color:  ${theme.colors.white};
        transition: 0.3s;
        cursor:pointer;
      }
      .divisor {
        text-align: center;
        margin: 1rem 0;
      }
      .googlesign {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #ececec;
        color:  ${theme.colors.black};
        border: 0;
        padding: 1rem 2rem;
        text-decoration: none;
        transition: 0.3s;
      }
      .googlesign:hover{
        background: ${theme.colors.secondarycolor};
        color:  ${theme.colors.white};
        transition: 0.3s;
      }
      .back {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #ececec;
        color:  ${theme.colors.black};
        border: 0;
        padding: 1rem 2rem;
        text-decoration: none;
        transition: 0.3s;
      }
      .back:hover {
        background: ${theme.colors.secondarycolor};
        color:  ${theme.colors.white};
        transition: 0.3s;
      }
      a {
        text-decoration: none;
        padding: 0.2rem 0.7rem;
        color: ${theme.colors.white};
        display: inline-block;
        transition: 0.4s;
        border: 1px solid black;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        margin-left: 0.5rem;
      }
      a:hover {
        background: ${theme.colors.secondarycolor};
        transition: 0.4s;
        color: ${theme.colors.white};
        cursor: pointer;
      }
    `}</style>
    </>
  );
};

export default Loginmodal;
