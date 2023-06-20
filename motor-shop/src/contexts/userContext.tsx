import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@/services";
import { UpdateUser, UserType } from "@/schemas";
import { useAuth } from "./authContext";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

interface Props {
  children: ReactNode;
}

interface UserContextProviderData {
  listOne: (id: string) => Promise<UserType | undefined>;
  deleteSelf: (id: string) => Promise<void>;
  updateSelf: (id: string, data: UpdateUser) => Promise<UserType | undefined>;
  listAll: () => Promise<UserType[] | undefined>;
  currUser: UserType | null;
}

interface DecodeObj {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export const UserContext = createContext<UserContextProviderData>(
  {} as UserContextProviderData
);

export function UserProvider({ children }: Props) {
  const [currUser, setCurrUser] = useState<UserType | null>(null);
  const { logout } = useAuth();

  const { token } = useAuth();

  const headers = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      const id = jwtDecode<DecodeObj>(token).sub;

      listOne(id);
    }
  }, [token]);

  const listAll = async () => {
    try {
      const users: Array<UserType> = (await api.get('users', headers)).data;
      return users;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  }

  const listOne = async (id: string) => {
    try {
      const userData: UserType = (await api.get(`users/${id}`, headers)).data;

      setCurrUser(userData);
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const updateSelf = async (id: string | null, data: UpdateUser) => {
    try {
      const updatedUser: UserType = (
        await api.patch(`users/${id}`, data, headers)
      ).data;

      setCurrUser(updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const deleteSelf = async (id: string) => {
    try {
      await api.delete(`users/${id}`, headers);
      logout();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ listOne, deleteSelf, updateSelf, currUser, listAll }}>
      {children}
    </UserContext.Provider>
  );
}
