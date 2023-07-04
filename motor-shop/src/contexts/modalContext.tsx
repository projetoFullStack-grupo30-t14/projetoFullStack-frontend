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
  stateModalPicture: boolean;
  showPictureModal: (children: React.ReactNode, title: string) => void;
  closePictureModal: () => void;
}

interface iModalProviderProps {
  children: React.ReactNode;
}

export const modalContext = createContext({} as iModalContextProps);

export default function ModalProvider ({ children }: iModalProviderProps) {
  const [stateModal, setStateModal] = useState(false);
  const [stateModalComment, setStateModalComment] = useState(false)
  const [stateModalPicture, setStateModalPicture] = useState(false)
  const [childrenModal, setChildrenModal] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState("")


  const showModal = (children: React.ReactNode, title: string) => {
    setStateModal(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const showCommentModal = (children: React.ReactNode, title: string) => {
    setStateModalComment(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const showPictureModal = (children: React.ReactNode, title: string) => {
    setStateModalPicture(true);
    setModalTitle(title)
    setChildrenModal(children);
  };

  const closeModal = () => {
    setStateModal(false);
  };

  const closeCommentModal = () => {
    setStateModalComment(false);
  };

  const closePictureModal = () => {
    setStateModalPicture(false);
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
        showPictureModal,
        closePictureModal,
        stateModalPicture,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

export const useModal = () => useContext(modalContext);
