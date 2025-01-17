import { useEffect, useRef } from "react";

import useModal from "./useModal";

export default function useModalWithState<T = boolean>(modalState?: T) {
  const modal = useModal();
  const modalStateRef = useRef<T | null>(modalState || null);

  useEffect(() => {
    if (!modal.isModalOpened) {
      modalStateRef.current = null;
    }
  }, [modal.isModalOpened]);

  const closeModal = () => {
    modal.closeModal();
  };

  const openModal = (modalState: T) => {
    modalStateRef.current = modalState;
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
    modalState: modalStateRef.current,
    closeModal,
    openModal,
  };
}
