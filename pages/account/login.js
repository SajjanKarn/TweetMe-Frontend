import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("🤨 Please enter all the fields!");
      return;
    }
    const user = { username, password };
    login(user);
  };

  return (
    <Layout>
      <ToastContainer autoClose={3000} />
      <h3>Login Account.</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usernameInput" className="form-label mt-4">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            placeholder="John_Doe *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Your Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <div className="mt-3">
          Don't have an account ? <Link href="/account/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
