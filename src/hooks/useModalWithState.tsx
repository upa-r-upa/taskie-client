import { useEffect, useState } from "react";

import useModal from "./useModal";

export default function useModalWithState<T>(initialState?: T) {
  const modal = useModal();
  const [modalState, setModalState] = useState<T | null>(initialState || null);

  useEffect(() => {
    if (!modal.isModalOpened) {
      setModalState(null);
    }
  }, [modal.isModalOpened]);

  const closeModal = () => {
    modal.closeModal();
  };

  const openModal = (modalState: T) => {
    setModalState(modalState);
    modal.openModal();
  };

  const setIsOpened = (isOpened: boolean) => {
    if (isOpened) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  };

  return {
    isOpened: modal.isModalOpened,
    setIsOpened: setIsOpened,
    modalState,
    closeModal,
    openModal,
  };
}
