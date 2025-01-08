import { useEffect, useRef, useState } from "react";

export default function useModalWithState<T = boolean>(modalState?: T) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [innerModalState, setInnerModalState] = useState<T | null>(
    modalState || null
  );

  useEffect(() => {
    setInnerModalState(modalState || null);
  }, [setInnerModalState, modalState]);

  const closeModal = () => {
    setInnerModalState(null);
  };

  const openModal = (nextModalState: T) => {
    setInnerModalState(nextModalState);
  };

  useEffect(() => {
    if (innerModalState) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [innerModalState]);

  return { modalRef, modalState: innerModalState, closeModal, openModal };
}
