import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import theme from "../config/theme";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import Loginmodal from "./Login-modal";
import Signupmodal from "./Signup-modal";
import { IUser } from "../contexts/authenticantion.context";
import { AuthContext } from "../contexts/authenticantion.context";
import {ProgressSpinner} from 'primereact/progressspinner';

type Props = {
  user: IUser;
  signed: boolean;
  loading: boolean;
};

const Header: React.FC<Props> = ({ children, user, signed, loading }) => {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  return (
    <nav className="bg-primarycolor flex flex-col justify-center items-center md:flex-row py-2 px-4 overflow-hidden">
      <span className="bg-primarycolor text-white font-bold text-h6 md:text-h5 md:mr-8">OdontoEasy.</span>
      {loading ? (<div className='spinner mt-1'>
      <ProgressSpinner style={{width: 40}} strokeWidth='8'/>
      </div>  
      ) : signed ? (
        <>
          <div className="profile-info">
            {/* <img
              width="60"
              style={{ borderRadius: "50%", marginRight: "0.5rem" }}
              alt="user picture"
            /> */}
            <h4>{user.name}</h4>
          </div>
          <div className="left">
            <Link href="/">
              <a className="bold" data-active={isActive("/")}>
                Blog
              </a>
            </Link>
            <Link href="/drafts">
              <a data-active={isActive("/drafts")}>Drafts</a>
            </Link>
          </div>
          <div className="right">
            <Link href="/create">
              <a data-active={isActive("/create")}>+ Create draft</a>
            </Link>
            <a onClick={() => signOut()}>Logout</a>
          </div>
        </>
      ) : (
        <>
          <div className="profile-info">
            <h4 className="text-1x">Welcome</h4>
          </div>
          <div className="left">
            <Link href="/">
              <a className="bold" data-active={isActive("/")}>
                Blog
              </a>
            </Link>
            
          </div>
          <div className="right">
            {/* <Link href="/api/login">
            <a>Login with
               <div><FaGoogle/><FaFacebook/><FaLinkedin/></div>
            </a>
            </Link> */}
            {/* <a onClick={handleShow}>Login</a> */}
            <Signupmodal title="Sign up" />
            <Link href="/login">
              <a data-active={isActive("/login")}>Login</a>
            </Link>
            {/* <Loginmodal title="Log in" /> */}
          </div>
        </>
      )}
      <style jsx>{` 
        .profile-info {
          background: ${theme.colors.secondarycolor};
          padding: 0.2rem 1rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: ${theme.colors.white};
        }
        .logo {
          color: ${theme.colors.white};
          margin-right: 1rem;
        }
        .bold {
          font-weight: bold;
        }
        a {
          text-decoration: none;
          padding: 0.2rem 0.7rem;
          color: ${theme.colors.white};
          display: inline-block;
          transition: 0.4s;
        }
        a:hover {
          background: ${theme.colors.secondarycolor};
          transition: 0.4s;
        }
        .left {
          margin: 0 0.5rem;
        }
        .left a[data-active="true"] {
          padding: 0.2rem 0.7rem;
          color: ${theme.colors.white};
          background: ${theme.colors.secondarycolor};
        }
        a + a {
          margin-left: 0.5rem;
        }
        .right {
          margin-left: auto;
        }
        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  );
};

export default Header;
