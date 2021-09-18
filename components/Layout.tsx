import React,{ ReactNode, useContext } from 'react'
import Header from './Header'
import { AuthContext } from '../contexts/authenticantion.context'



type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => { 
  const { loading, user, signed, loginattempts, token } = useContext(AuthContext);
  return (
  <>
  <Header user={user} signed={signed} loading={loading}  />
  <div className="bg-black">{props.children}</div>
</>)
}
export default Layout