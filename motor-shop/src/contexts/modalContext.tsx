import React, { createContext, useContext, useState } from "react";

interface iModalContextProps {
  stateModal: boolean;
  stateModalProduct: boolean;
  showModal: (children: React.ReactNode, title: string) => void;
  closeModal: () => void;
  childrenModal: React.ReactNode;
  modalTitle: string;
  showProductModal: (children: React.ReactNode, title: string) => void;
  closeProductModal: () => void;
}

interface iModalProviderProps {
  children: React.ReactNode;
}

export const modalContext = createContext({} as iModalContextProps);

export default function ModalProvider ({ children }: iModalProviderProps) {
  const [stateModal, setStateModal] = useState(false);
  const [stateModalProduct, setStateModalProduct] = useState(false)
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState("")


  const showModal = (children: React.ReactNode, title: string) => {
    setStateModal(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const showProductModal = (children: React.ReactNode, title: string) => {
    setStateModalProduct(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const closeModal = () => {
    setStateModal(false);
  };

  const closeProductModal = () => {
    setStateModalProduct(false);
  };

  return (
    <modalContext.Provider
      value={{
        stateModal,
        showModal,
        closeModal,
        childrenModal,
        modalTitle,
        showProductModal,
        closeProductModal,
        stateModalProduct,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

export const useModal = () => useContext(modalContext);
