"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AuthContextType } from "./types";
import { getUser } from "@/utils";

type UserProps = {
  _id: string;
  username: string;
  email: string;
  role: number;
} | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const userRes = await getUser(token);
          setUser(userRes.data);
        } catch (error) {
          console.log(error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/login`,
        { email, password }
      );

      if (!res.data.error) {
        setCookie("token", res.data.token, { maxAge: 60 * 60 * 24 });
        setUser(res.data.user);
        router.push("/");
        return { success: true, msg: "" };
      } else {
        return { success: false, msg: res.data.error };
      }
    } catch (error) {
      return { success: false, msg: "Có lỗi gì đó xảy ra" };
    }
  };
  const logout = () => {
    deleteCookie("token");
    setUser(null);
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
