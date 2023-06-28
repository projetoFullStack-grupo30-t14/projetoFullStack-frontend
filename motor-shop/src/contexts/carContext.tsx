import { TCar, TCarData } from "@/schemas/car.schema";
import { api } from "@/services";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { ReactNode, createContext, useState, useContext } from "react";
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
  getOneCar: (id: string) => Promise<TCar | null>;
  getValues: () => Promise<void>;
  patchOneCar: (id: string) => Promise<void | null>;
  deleteOneCar: (id: string) => Promise<void | null>;
  getCarsByOwner: () => Promise<TCar[] | null>;
  listCars: TCar[];
  listOneCar?: TCar;
  values: Values;
  listCarsByOwner: TCar[];
  nextPage: string | null;
  previousPage: string | null;
  count: number | undefined;
  carLoading: boolean;
}

export const CarContext = createContext<CarContextProviderData>(
  {} as CarContextProviderData
);

export const CarProvider = ({ children }: Props) => {
  const [listCars, setListCars] = useState<TCar[]>([]);
  const [listOneCar, setListOneCar] = useState<TCar>();
  const [values, setValues] = useState<Values>({} as Values);
  const [listCarsByOwner, setListCarsByOwner] = useState<TCar[]>([]);
  const [nextPage, setNext] = useState<string | null>(null);
  const [previousPage, setPrevious] = useState<string | null>(null);
  const [count, setCount] = useState<number>();
  const token = parseCookies(null)["motorShop.token"];
  const [carLoading, setCarLoading] = useState(true);

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
      setCarLoading(false);
      const response = await api.get(`cars${searchParams}`);
      setListCars(response.data.data);
      setNext(response.data.nextPage);
      setPrevious(response.data.previousPage);
      setCount(response.data.count);
      return response.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setCarLoading(true);
    }
  };

  const getOneCar = async (id: string) => {
    try {
      setCarLoading(false);
      const response = await api.get(`cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListOneCar(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setCarLoading(true);
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
    } catch (error) {
      console.log(error);
    }
  };

  const getValues = async () => {
    try {
      const response = await api.get("cars/access/values");
      setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const patchOneCar = async (id: string) => {
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

  const deleteOneCar = async (id: string) => {
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
        listCarsByOwner,
        nextPage,
        previousPage,
        count,
        carLoading,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);
