import React, { createContext, useContext, useState } from "react";

interface iModalContextProps {
  stateModal: boolean;
  showModal: (children: React.ReactNode, title: string) => void;
  closeModal: () => void;
  childrenModal: React.ReactNode;
  modalTitle: string;
}

interface iModalProviderProps {
  children: React.ReactNode;
}

export const modalContext = createContext({} as iModalContextProps);

export default function ModalProvider ({ children }: iModalProviderProps) {
  const [stateModal, setStateModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState("")


  const showModal = (children: React.ReactNode, title: string) => {
    setStateModal(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const closeModal = () => {
    setStateModal(false);
    // setTimeout(() => {
    // }, 800);
  };

  return (
    <modalContext.Provider
      value={{
        stateModal,
        showModal,
        closeModal,
        childrenModal,
        modalTitle,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

export const useModal = () => useContext(modalContext);
