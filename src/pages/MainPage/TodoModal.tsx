import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

import { TodoBase } from "../../api/generated";

interface TodoModalProps {
  modalId: string;
  title: string;
  targetDate: string;

  content?: string;
  isLoading?: boolean;
  modalRef: React.RefObject<HTMLDialogElement>;

  onSubmitTodo: (todo: TodoBase) => void;
}

export default function TodoModal({
  modalId,
  isLoading,
  title: originTitle,
  content: originContent,
  targetDate: originTargetDate,
  onSubmitTodo,
  modalRef,
}: TodoModalProps) {
  const [title, setTitle] = useState<string>(originTitle);
  const [content, setContent] = useState<string>(originContent || "");
  const [targetDate, setTargetDate] = useState<string>(originTargetDate);

  const handleValueChange = (value: DateValueType) => {
    if (!value?.startDate) {
      return;
    }

    setTargetDate(value.startDate as string);
  };

  const handleConfirmModal = () => {
    onSubmitTodo({
      title: title,
      content: content,
      order: 0,
      target_date: targetDate,
    });
  };

  return (
    <dialog
      id={modalId}
      className="modal modal-bottom m-auto rounded-lg shadow-lg p-3 pb-0"
      ref={modalRef}
    >
      <div className="modal-box h-auto flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            할 일 추가
          </h3>
          <input
            type="text"
            placeholder="할 일을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full text-sm mb-3"
          />

          <Datepicker
            i18n="ko"
            separator={"-"}
            asSingle={true}
            useRange={false}
            displayFormat="YYYY-MM-DD"
            value={{
              endDate: targetDate,
              startDate: targetDate,
            }}
            placeholder="날짜를 지정해주세요."
            onChange={handleValueChange}
            inputClassName="input input-bordered w-full text-sm input-md"
          />

          <div className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할 일 내용을 보충 설명해보세요."
              className="textarea textarea-bordered w-full h-64 text-md"
            />
          </div>
        </div>

        <div className="modal-action justify-end mt-6">
          <button
            onClick={handleConfirmModal}
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "할 일 저장 중..." : "확인"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
