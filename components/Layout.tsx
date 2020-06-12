import React,{ ReactNode, useContext } from 'react'
import Header from './Header'
import { AuthContext } from '../contexts/authenticantion.context'



type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => { 
  const { loading, user, signed, loginattempts, token } = useContext(AuthContext);
  return (
  <div>
  <Header user={user} signed={signed} loading={loading}  />
  <div className="layout">{props.children}</div>
  <style jsx global>{`
      html {
        box-sizing: border-box;
      }
      *,
      *:before,
      *:after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      body {
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        background: rgba(0, 0, 0, 0.05);
      }
      input,
      textarea {
        font-size: 16px;
      }
      button {
        cursor: pointer;
      }
    `}</style>
  <style jsx>{`
      .layout {
        display: flex;
      }
    `}</style>
</div>)
}
export default Layout