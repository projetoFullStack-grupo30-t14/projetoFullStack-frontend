import { ReactNode, createContext, useState } from "react";
import { api } from "@/services";
import { UpdateUser, UserType } from "@/schemas";
import { useAuth } from "./authContext";
import { parseCookies } from "nookies";

interface Props {
  children: ReactNode;
}

interface UserContextProviderData {
  listSelf: (id: string) => Promise<UserType | undefined>;
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

  const token = parseCookies(null, "motorShop.token")["motorShop.token"];

  const headers = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const listSelf = async (id: string) => {
    try {
      const userData: UserType = (await api.get(`users/${id}`, headers)).data;

      setCurrUser(userData);
      return userData;
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const deleteSelf = async (id: string) => {
    try {
      await api.delete(`users/${id}`, headers);
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ listSelf, deleteSelf, updateSelf, currUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
