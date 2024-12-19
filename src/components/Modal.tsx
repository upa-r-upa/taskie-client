import { forwardRef } from "react";

interface Props {
  title: string;

  id?: string;

  children?: React.ReactNode;
  buttons?: React.ReactNode;
}

const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ id, title, children, buttons }, ref) => {
    return (
      <dialog
        ref={ref}
        id={id}
        className="modal rounded-lg shadow-lg p-3 pb-0 modal-bottom z-1"
      >
        <div className="modal-box flex flex-col max-w-lg mx-auto">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {title}
            </h3>

            <div className="flex flex-col gap-2 mt-2">{children}</div>
          </div>

          <div className="modal-action justify-stretch mt-6 gap-2">
            {buttons}
          </div>
        </div>
      </dialog>
    );
  }
);

export default Modal;
