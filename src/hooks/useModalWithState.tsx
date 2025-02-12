import { useState } from "react";

import useModal from "./useModal";

export default function useModalWithState<T>(initialState?: T) {
  const modal = useModal();
  const [visibleState, setVisibleState] = useState<T | null>(
    initialState || null
  );

  const closeModal = () => {
    modal.closeModal();
  };

  const openModal = (modalState: T) => {
    setVisibleState(modalState);
    modal.openModal();
  };

  const setIsOpened = (isOpened: boolean) => {
    if (isOpened) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  };

  const invisibleModal = () => {
    setVisibleState(null);
  };

  return {
    isOpened: modal.isModalOpened,
    setIsOpened: setIsOpened,
    invisibleModal: invisibleModal,
    visibleState,
    closeModal,
    openModal,
  };
}
