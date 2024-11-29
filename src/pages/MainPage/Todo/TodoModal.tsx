import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import TimePicker from "@/components/TimePicker";
import { getDateWithoutTime } from "@/utils/time";

import { TodoModalSubmitProps } from "../types";

interface TodoModalProps {
  modalTitle: string;
  modalId: string;
  title: string;
  targetDate: Date;

  content?: string;
  isLoading?: boolean;
  extraButton?: React.ReactElement;
  modalRef: React.RefObject<HTMLDialogElement>;

  onTodoSubmit: (todo: TodoModalSubmitProps) => void;
  onCancel: () => void;
}

export default function TodoModal({
  modalTitle,
  modalId,
  isLoading,
  title: originTitle,
  content: originContent,
  targetDate: originTargetDate,
  onCancel,
  onTodoSubmit,
  extraButton,
  modalRef,
}: TodoModalProps) {
  const [title, setTitle] = useState<string>(originTitle);
  const [content, setContent] = useState<string>(originContent || "");
  const [targetDate, setTargetDate] = useState<Date>(
    getDateWithoutTime(originTargetDate)
  );

  const handleValueChange = (value: DateValueType) => {
    if (!value?.startDate) {
      return;
    }

    value.startDate.setMinutes(
      targetDate.getHours(),
      targetDate.getMinutes(),
      0
    );
    setTargetDate(value.startDate);
  };

  const handleTimeChange = (minutes: number) => {
    targetDate.setHours(Math.floor(minutes / 60), minutes % 60);
  };

  const handleConfirmModal = () => {
    onTodoSubmit({
      title: title,
      content: content,
      targetDate: targetDate,
    });
  };

  return (
    <dialog
      id={modalId}
      className="modal rounded-lg shadow-lg p-3 pb-0 modal-bottom"
      ref={modalRef}
    >
      <div className="modal-box flex flex-col max-w-lg mx-auto ">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {modalTitle}
          </h3>
          <AutoResizeTextarea
            value={title}
            placeholder={"할 일을 입력하세요."}
            onChange={(value) => setTitle(value)}
          />

          <div className="flex flex-col gap-2">
            <Datepicker
              i18n="ko"
              asSingle={true}
              useRange={false}
              displayFormat="YYYY년 MM월 DD일"
              value={{
                endDate: targetDate,
                startDate: targetDate,
              }}
              placeholder="날짜를 지정해주세요."
              popoverDirection="down"
              onChange={handleValueChange}
              inputClassName="input input-bordered w-full text-sm input-md"
            />
            <TimePicker
              minutes={targetDate.getHours() * 60 + targetDate.getMinutes()}
              onChange={handleTimeChange}
              className="w-32"
            />
          </div>

          <div className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="할 일 내용을 보충 설명해보세요."
              className="textarea textarea-bordered w-full h-64 text-md"
            />
          </div>
        </div>

        <div className="modal-action justify-stretch mt-6 gap-2">
          <button
            onClick={handleConfirmModal}
            className="btn btn-primary flex-1"
            disabled={isLoading}
          >
            {isLoading ? "할 일 저장 중..." : "확인"}
          </button>
          <button
            onClick={onCancel}
            className="btn flex-1"
            disabled={isLoading}
          >
            취소
          </button>
          {extraButton}
        </div>
      </div>
    </dialog>
  );
}
