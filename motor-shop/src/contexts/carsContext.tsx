import { ReactNode, createContext, useState } from "react";
import { api } from "@/services";

interface Props {
  children: ReactNode;
}

interface CarsContextProviderData {}

export const CarsContext = createContext<CarsContextProviderData>(
  {} as CarsContextProviderData
);

export function AuthProvider({ children }: Props) {
  return <CarsContext.Provider value={{}}>{children}</CarsContext.Provider>;
}
