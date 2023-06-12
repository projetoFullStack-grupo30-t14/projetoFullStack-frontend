import { ReactNode, createContext, useContext, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { TLogin } from "@/schemas/login.schema";
import { api } from "@/services";

interface User {
  id: string;
}

interface Props {
  children: ReactNode;
}

interface AuthProviderData {
  setToken: (value: string) => void;
  login: (userData: TLogin) => void;
  register: (userData: TLogin) => Promise<void>;
  token: string | undefined;
  user: User | null;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const register = async (userData: TLogin) => {
    try {
      await api.post("users");

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (userData: TLogin) => {
    try {
      const data = await api.post("login", userData);

      setCookie(null, "motorShop.token", data.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });

      setCookie(null, "motorShop.userName", data.data.user.name, {
        maxAge: 60 * 30,
        path: "/",
      });

      setToken(data.data.token);
      setUser(data.data.user);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  //   )
  return (
    <AuthContext.Provider value={{ login, register, user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
