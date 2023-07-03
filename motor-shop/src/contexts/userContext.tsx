import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { api } from '@/services';
import { UpdateUser, UserType } from '@/schemas';
import { useAuth } from './authContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import {
  tAddressResponse,
  tResetPassword,
  tUserSendMail,
} from '@/schemas/user.register.schema';

interface Props {
  children: ReactNode;
}

interface UserContextProviderData {
  listOne: (id: string) => Promise<UserType | undefined>;
  deleteSelf: (id: string) => Promise<void>;
  updateSelf: (
    id: string,
    data: UpdateUser
  ) => Promise<UserType | undefined>;
  listAll: () => Promise<UserType[] | undefined>;
  sendMailPass: (data: tUserSendMail) => Promise<void | string>;
  resetPassword: (
    data: tResetPassword,
    token: string
  ) => Promise<void | string>;
  currUser: UserType | null;
  currAddress: tAddressResponse | null;
  setCurrAddress: Dispatch<SetStateAction<tAddressResponse | null>>;
  headers: { headers: { authorization: string | undefined } };
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
  const [currAddress, setCurrAddress] =
    useState<tAddressResponse | null>(null);

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
      const users: Array<UserType> = (await api.get('users', headers))
        .data;
      return users;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const listOne = async (id: string) => {
    try {
      const userData: UserType = (
        await api.get(`users/${id}`, headers)
      ).data;

      const addresses: tAddressResponse[] = (
        await api.get('addresses', headers)
      ).data;

      const userAddress: tAddressResponse = addresses.filter(
        (address) => address.user_id == userData.id
      )[0];

      setCurrAddress(userAddress);
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

  const sendMailPass = async (data: tUserSendMail): Promise<void> => {
    try {
      const sendMail = await api.post('users/resetPassword', data);

      toast.success(sendMail.data.message);
      return sendMail.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  const resetPassword = async (
    data: tResetPassword,
    token: string
  ): Promise<void> => {
    try {
      const resetPassword = await api.patch(
        `users/resetPassword/${token}`,
        data
      );

      toast.success(resetPassword.data.message);
      return resetPassword.data;
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
    <UserContext.Provider
      value={{
        listOne,
        deleteSelf,
        updateSelf,
        currUser,
        currAddress,
        setCurrAddress,
        headers,
        listAll,
        sendMailPass,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
