import { ReactNode, createContext, useState } from "react";
import { api } from "@/services";
import { UpdateUser, UserType } from "@/schemas";
import { useAuth } from "./authContext";
import { parseCookies } from "nookies";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface UserContextProviderData {
  listOne: (id: string) => Promise<UserType | undefined>;
  deleteSelf: (id: string) => Promise<void>;
  updateSelf: (id: string, data: UpdateUser) => Promise<UserType | undefined>;
  currUser: UserType | null;
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

  const updateSelf = async (id: string, data: UpdateUser) => {
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
    <UserContext.Provider value={{ listOne, deleteSelf, updateSelf, currUser }}>
      {children}
    </UserContext.Provider>
  );
}
