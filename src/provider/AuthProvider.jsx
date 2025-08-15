import React, { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TOKEN_KEY = "accessToken";
const USER_KEY = "authUser";

export default function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t && u) {
      setToken(t);
      try {
        setUser(JSON.parse(u));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axiosPublic.post("/auth/login", { email, password });
    const { accessToken, user: usr } = res?.data?.data ?? {};
    if (!accessToken || !usr) throw new Error("Invalid login response");

    setToken(accessToken);
    setUser(usr);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(usr));

    return usr;
  };

  const logout = async () => {
    try {
      await axiosPublic.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  console.log(user);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
