import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [register, setRegister] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register: registerContext, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // check empty fields.
    if (
      !register.username ||
      !register.fullname ||
      !register.email ||
      !register.password ||
      !register.confirmPassword
    ) {
      toast.error("🤨 Please enter all the required fields!");
      return;
    }

    // match password
    if (register.password !== register.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    registerContext(register);
  };

  return (
    <Layout>
      <ToastContainer autoClose={3000} />
      <h3>Register Account.</h3>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="abc@example.com"
            name="email"
            value={register.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usernameInput" className="form-label mt-4">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            placeholder="John_Doe *"
            name="username"
            value={register.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullnameInput" className="form-label mt-4">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullnameInput"
            placeholder="John Doe *"
            name="fullname"
            value={register.fullname}
            onChange={handleInputChange}
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
            placeholder="Choose a Password"
            name="password"
            value={register.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput2" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput2"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
        <div className="mt-3">
          Already have an account ? <Link href="/account/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
}
