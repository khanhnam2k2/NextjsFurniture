"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    const user = getCookie("user");

    if (token && user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/login`,
        { email, password }
      );

      if (!data.error) {
        setCookie("token", data.token, { maxAge: 60 * 60 * 24 });
        setCookie("user", JSON.stringify(data), { maxAge: 60 * 60 * 24 });
        setUser(data.username);
        router.push("/");
      } else {
        setError(data.error);
      }
    } catch (error) {
      throw error;
    }
  };
  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
    setUser(null);
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
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
