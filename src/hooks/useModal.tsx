import { useState } from "react";

export default function useModal(defaultModalOpened: boolean = false) {
  const [isModalOpened, setIsModalOpened] =
    useState<boolean>(defaultModalOpened);

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const setIsOpened = (opened: boolean) => {
    setIsModalOpened(opened);
  };

  return { isModalOpened, closeModal, openModal, setIsOpened };
}
