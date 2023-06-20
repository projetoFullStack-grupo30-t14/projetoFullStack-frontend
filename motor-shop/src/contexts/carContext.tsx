import { TCar, TCarData } from "@/schemas/car.schema";
import { api } from "@/services";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

interface Values {
  year: number[];
  brand: string[];
  color: string[];
  model: string[];
}

interface CarContextProviderData {
  createCar: (data: TCarData) => Promise<TCar | void>;
  getAllCars: (searchParams: string) => Promise<TCar[] | null>;
  getOneCar: (id: number) => Promise<TCar | null>;
  getValues: () => Promise<void>;
  patchOneCar: (id: number) => Promise<void | null>;
  deleteOneCar: (id: number) => Promise<void | null>;
  getCarsByOwner: () => Promise<TCar[] | null>;
  listCars: TCar[];
  listOneCar?: TCar;
  values: Values;
  listCarsByOwner: TCar[];
}

export const CarContext = createContext<CarContextProviderData>(
  {} as CarContextProviderData
);

export const CarProvider = ({ children }: Props) => {
  const [listCars, setListCars] = useState<TCar[]>([]);
  const [listOneCar, setListOneCar] = useState<TCar>();
  const [values, setValues] = useState<Values>({} as Values);
  const [listCarsByOwner, setListCarsByOwner] = useState<TCar[]>([]);
  const token = parseCookies(null)["motorShop.token"];

  const createCar = async (data: TCarData) => {
    try {
      const response = await api.post("cars", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Carro criado com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const getAllCars = async (searchParams: string = "") => {
    try {
      const response = await api.get(`cars${searchParams}`);
      setListCars(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getOneCar = async (id: number) => {
    try {
      const response = await api.get(`cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListOneCar(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCarsByOwner = async () => {
    try {
      const response = await api.get(`cars/access/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListCarsByOwner(response.data);
      return response.data;
    }catch (error) {
      console.log(error);
    };
  }

  const getValues = async () => {
    try {
      const response = await api.get("cars/access/values");
      setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const patchOneCar = async (id: number) => {
    try {
      const response = await api.patch(`cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Carro atualizado");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
        return null;
      }
    }
  };

  const deleteOneCar = async (id: number) => {
    try {
      const response = await api.delete(`cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Carro deletado");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
        console.log(error);
      } else {
        console.log(error);
        return null;
      }
    }
  };

  return (
    <CarContext.Provider
      value={{
        createCar,
        getAllCars,
        getOneCar,
        getValues,
        patchOneCar,
        deleteOneCar,
        getCarsByOwner,
        listCars,
        listOneCar,
        values,
        listCarsByOwner
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);
