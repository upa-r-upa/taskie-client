import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { TodoPublic } from "@/api/generated";
import { cn } from "@/lib/utils";
import { todoApi } from "@/api/client";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  todo: TodoPublic | null;
  onTodoUpdate?: (updatedTodo: TodoPublic) => void;
}

export default function TodoDetail({ todo, onTodoUpdate }: Props) {
  const [title, setTitle] = useState(todo?.title ?? "");
  const [content, setContent] = useState(todo?.content ?? "");

  return (
    <div className="space-y-4 border rounded-lg p-4 shadow-sm flex flex-col h-full">
      {!todo ? (
        <div className="text-center py-8 text-gray-500 flex-grow flex items-center justify-center">
          현재 선택된 할 일이 없어요. 할 일을 클릭해서 확인해보세요.
        </div>
      ) : (
        <>
          <div>
            <AutoResizeTextarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 없음"
              rows={1}
              className="w-full resize-none border-none bg-transparent p-0 text-lg focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none font-bold"
            />
          </div>

          <div className="flex-grow">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="w-full h-full resize-none border-none bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
