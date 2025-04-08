import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { TodoPublic } from "@/api/generated";
import { cn } from "@/lib/utils";
import { todoApi } from "@/api/client";

interface Props {
  todo: TodoPublic | null;
  onTodoUpdate?: (updatedTodo: TodoPublic) => void;
}

export default function TodoDetail({ todo, onTodoUpdate }: Props) {
  const [title, setTitle] = useState(todo?.title ?? "");
  const [content, setContent] = useState(todo?.content ?? "");

  return (
    <div className="space-y-4 border rounded-lg p-4 shadow-sm min-h-[250px] flex flex-col">
      {!todo ? (
        <div className="text-center py-8 text-gray-500 flex-grow flex items-center justify-center">
          현재 선택된 할 일이 없어요. 할 일을 클릭해서 확인해보세요.
        </div>
      ) : (
        <>
          <div>
            <textarea
              value={title}
              placeholder="제목 없음"
              className={cn(
                "w-full resize-none overflow-hidden bg-transparent text-xl font-bold outline-none",
                "border-0 p-0 focus:ring-0"
              )}
              rows={1}
              style={{
                height: "auto",
                minHeight: "1.5rem",
              }}
            />
          </div>

          <div className="flex-grow">
            <textarea
              value={content}
              placeholder="내용을 입력해주세요."
              className={cn(
                "w-full resize-none overflow-hidden bg-transparent outline-none h-full",
                "border-0 p-0 focus:ring-0"
              )}
              rows={5}
              style={{
                height: "auto",
                minHeight: "5rem",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
