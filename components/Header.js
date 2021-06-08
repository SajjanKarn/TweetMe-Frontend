import Link from "next/link";

import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link href={!user ? "/" : "#"}>
            <a className="navbar-brand">TweetMe</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link href="/tweets/">
                      <a className="nav-link">Tweets</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/tweets/add">
                      <a className="nav-link">Post Tweet</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/account/dashboard">
                      <a className="nav-link">Dashboard</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={() => logout()}>
                      <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about">
                      <a className="nav-link">About</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/account/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/account/register">
                      <a className="nav-link">Register</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
