import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  async function getUser() {

    return new Promise(async (resolve, reject) => {
      try {
        const token = Cookies.get("token");
        console.log(token);
        const result = await axios.post("http://localhost:4000/api/getUser", {
          token: token,
        }).catch((error) => console.log(error));
        setUser(result.data);
        resolve (result.data);
      } catch (error) {
        setIsLoggedIn(false);
        reject(error);
      }
    })

  }

  async function login(response) {
    try {
      const result = await axios.post("http://localhost:4000/api/loginUser", { res: response });
      Cookies.set("token", result.data)
      setIsLoggedIn(true)
      await getUser();
      navigate("/dashboard");
    } catch (error) {
      if (error && error.response.status == 401 || error.response.status == 400) {
        navigate("/unauthorized")
      }
      console.log(error)
      return;
    }

  }

  function logout() {
    setIsLoggedIn(false);
    setUser([]);
    try {
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(user)

  const value = {
    isLoggedIn,
    login,
    logout,
    getUser,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
