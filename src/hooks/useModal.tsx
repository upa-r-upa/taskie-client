import { useEffect, useRef, useState } from "react";

export default function useModal(defaultModalOpened: boolean = false) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpened, setIsModalOpened] =
    useState<boolean>(defaultModalOpened);

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  useEffect(() => {
    if (isModalOpened) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpened]);

  return { modalRef, isModalOpened, closeModal, openModal };
}
