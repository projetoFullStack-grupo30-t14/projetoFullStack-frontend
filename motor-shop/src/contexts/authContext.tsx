import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { TLogin } from "@/schemas/login.schema";
import { api } from "@/services";
import { tUserRequest } from "@/schemas/user.register.schema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Props {
  children: ReactNode;
}

interface AuthProviderData {
  setToken: (value: string) => void;
  login: (userData: TLogin) => void;
  register: (userData: tUserRequest) => Promise<void>;
  logout: () => void;
  token: string | undefined;
  protect: () => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(
    parseCookies(null, "motorShop.token")["motorShop.token"]
  );

  console.log(token);

  const register = async (userData: tUserRequest) => {
    try {
      await api.post("users", userData);
      toast.success("Usuário cadastrado!");

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const login = async (userData: TLogin) => {
    try {
      const data = await api.post("login", userData);

      setCookie(null, "motorShop.token", data.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });

      setToken(data.data.token);

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const logout = () => {
    destroyCookie(null, "motorShop.token");
    setToken(undefined);
    router.push("/");
  };

  const protect = () => {
    if (!token) {
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, register, logout, token, setToken, protect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
