import {
  BsCheck,
  BsCheckCircle,
  BsExclamation,
  BsExclamationCircle,
  BsInfoCircle,
} from "react-icons/bs";
import { MessageType, useMessageStore } from "../state/useMessageStore";
import { createPortal } from "react-dom";

export default function Messages() {
  const messages = useMessageStore((state) => state.messages);
  const clearMessage = useMessageStore((state) => state.clearMessage);

  const renderIcon = (type?: MessageType) => {
    switch (type) {
      case "info":
        return <BsInfoCircle />;
      case "error":
        return <BsExclamationCircle />;
      case "success":
        return <BsCheckCircle />;
      case "warning":
        return <BsExclamation />;
      default:
        return <BsInfoCircle />;
    }
  };

  return (
    <>
      {createPortal(
        <div className={`fixed bottom-0 w-full p-3 flex flex-col gap-3 z-50`}>
          {messages.map((message, index) => (
            <div
              key={index}
              role="alert"
              className={`alert shadow-lg ${
                message.type && "alert-" + message.type
              }`}
            >
              {renderIcon(message.type)}
              <div>
                <h3 className="font-bold">{message.message}</h3>
                {message.description && (
                  <div className="text-xs">{message.description}</div>
                )}
              </div>
              <div>
                <button
                  onClick={() => clearMessage(index)}
                  className="btn btn-sm btn-circle text-lg btn-outline"
                >
                  <BsCheck />
                </button>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
