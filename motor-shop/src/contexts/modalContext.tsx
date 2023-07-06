import React, { createContext, useContext, useState } from "react";

interface iModalContextProps {
  stateModal: boolean;
  showModal: (children: React.ReactNode, title: string) => void;
  closeModal: () => void;
  childrenModal: React.ReactNode;
  modalTitle: string;
  stateModalComment: boolean;
  showCommentModal: (children: React.ReactNode, title: string) => void;
  closeCommentModal: () => void;
  showEditCarModal: (children: React.ReactNode, title: string) => void;
}

interface iModalProviderProps {
  children: React.ReactNode;
}

export const modalContext = createContext({} as iModalContextProps);

export default function ModalProvider({ children }: iModalProviderProps) {
  const [stateModal, setStateModal] = useState(false);
  const [stateModalComment, setStateModalComment] = useState(false);
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState("");

  const isBrowser = () => typeof window !== "undefined"
  function scrollToTop () {
      if (!isBrowser()) return
      window.scrollTo({ top: 0, behavior: "smooth"})
  }

  const showModal = (children: React.ReactNode, title: string) => {
    setStateModal(true);
    setModalTitle(title);
    setChildrenModal(children);
    scrollToTop()
  };

  const showCommentModal = (children: React.ReactNode, title: string) => {
    setStateModalComment(true);
    setModalTitle(title);
    setChildrenModal(children);
  };

  const showEditCarModal = (children: React.ReactNode, title: string) => {
    setStateModal(true);
    scrollToTop()
    setModalTitle(title);
    setChildrenModal(children);
  };

  const closeModal = () => {
    setStateModal(false);
  };

  const closeCommentModal = () => {
    setStateModalComment(false);
  };

  return (
    <modalContext.Provider
      value={{
        stateModal,
        showModal,
        closeModal,
        childrenModal,
        modalTitle,
        showCommentModal,
        closeCommentModal,
        stateModalComment,
        showEditCarModal,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}

export const useModal = () => useContext(modalContext);
