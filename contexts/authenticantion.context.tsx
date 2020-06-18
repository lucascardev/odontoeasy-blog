import React, { createContext, useState, useEffect } from "react"
import myapi from '../services/myapi'
import * as auth from "../services/auth";
import Router from 'next/router'

type IUser = {
  id: number,
  name: string,
  scopes: string[]
}

 type AuthContextState = {
    token: string,
    user?: IUser,
    signed: boolean,
    loading: boolean,
    loginattempts: number,
    signIn: (recived: object) => object,
    signOut: () => void,
  }

  type Props = {
    children: React.ReactNode
  };

  export const AuthContext = createContext<AuthContextState | undefined>(
   undefined
  
);

export const AuthProvider = ({children}: Props) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginattempts, setLoginattempts] = useState(0);

    useEffect(() => {
      async function loadStoragedData() {
        setLoading(true);
        const storagedToken = localStorage.getItem("@LUPAuth:token");
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("storaged token:" + storagedToken);
        if (storagedToken) {
          const initialcheck = await auth.checkToken(storagedToken);
           console.log('done initial check:'+JSON.stringify(initialcheck));
          if (initialcheck) {
            console.log('variable initialcheck Auth ready:'+JSON.stringify(initialcheck.auth));
            setUser(initialcheck.user);
            setSigned(initialcheck.auth);
            // console.log('End of usestate signed is:'+signed)
            setLoading(false);      
          } else if (!initialcheck) {
            console.log("Not variable initialcheck");
            let keysToRemove = ["@LUPAuth:token", "@LUPAuth:user"];
            keysToRemove.forEach(k =>
            localStorage.removeItem(k))
            setUser(null);
            setToken("invalid token");
            setSigned(false);
            setLoading(false);
            // console.log("Token state: " + token);
          }    
        } else {
          console.log('Not token found token:');
          setSigned(false);
          setLoading(false);
        }
      }
   loadStoragedData();
   console.log('function maded')
    }, []);
  
    async function signIn(recived:object): Promise<object> {
      try {
        setLoading(true)
        const response = await myapi.post("/auth/login", recived)
        if (response.data.token) { 
        setToken(response.data.token);
         localStorage.setItem("@LUPAuth:token", response.data.token)
          // console.log('Token:'+response.token);
          const checkedtoken = await auth.checkToken(response.data.token)
             // console.log('Checked:'+JSON.stringify(checkedtoken))
             if (checkedtoken) {
               localStorage.setItem(
                "@LUPAuth:user",
                JSON.stringify(checkedtoken.user)
              );
              // console.log('User:'+JSON.stringify(checkedtoken.user));
              console.log('Auth:'+JSON.stringify(checkedtoken.auth))
              setUser(checkedtoken.user)
              setSigned(checkedtoken.auth)
              setLoading(false)
              return {response: 'User '+checkedtoken.user.name+' has logged in'}
            }
           }            
      } catch (err) {
        setLoginattempts(loginattempts + 1)
        // console.log("Error:" + err.response.data + loginattempts)
        setLoading(false)
        return {err};
      }
    }
  
    async function signOut() {
      let keysToRemove = ["@LUPAuth:token", "@LUPAuth:user"];
      keysToRemove.forEach(k =>
        localStorage.removeItem(k))
        setUser(null)
        setSigned(false)
        await Router.push('/')
    }
      return (
      < AuthContext.Provider value={{ 
        token,
        loading,
        loginattempts,
        user,
        signed,
        signIn,
        signOut }} >
      {children}
      </ AuthContext.Provider>
      )
  
   
  }
  
export type { IUser } 