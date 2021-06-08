import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { API_URL, NEXT_URL } from "../config/index";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkIsLoggedIn(), []);

  // register a user
  const register = (user) => {
    const { confirmPassword, ...registerData } = user;
    Axios.post(`${NEXT_URL}/api/register`, registerData)
      .then((response) => {
        if (!response.data.error) {
          setUser(response.data.user);
          router.push("/account/dashboard");
        } else {
          setError(response.data.error);
          setError(null);
        }
      })
      .catch((err) => console.log(err));
  };

  // login a user
  const login = async (user) => {
    // login
    axios
      .post(`${NEXT_URL}/api/login`, user)
      .then((response) => {
        if (!response.data.error) {
          setUser(response.data.user);
          router.push("/account/dashboard");
        } else {
          setError(response.data.error);
          setError(null);
        }
      })
      .catch((err) => console.log(err));
  };

  // persist user login.
  const checkIsLoggedIn = () => {
    Axios.get(`${NEXT_URL}/api/user`)
      .then((response) => {
        const { user } = response.data;
        setUser(user);
        router.push("/tweets");
      })
      .catch((err) => {
        // 403 status...
        if (router.pathname === "/account/dashboard" || router.pathname === "/tweets") {
          router.push("/account/login");
          return;
        }
      });
  };

  // logout user...
  const logout = () => {
    Axios.post(`${NEXT_URL}/api/logout`)
      .then((response) => {
        if (!response.data.message) {
          router.push("/account/login");
        } else {
          setUser(null);
          router.push("/account/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
