import { useEffect, useMemo, useRef, useState } from "react";
import { Trash2 } from "lucide-react";

import { TodoPublic } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/utils/time";
import DateTimePicker from "@/components/ui/date-time-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { TextAreaAutosize } from "@/components/ui/textarea-autosize";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TodoModalSubmitProps } from "@/pages/MainPage/types";

interface Props {
  todo: TodoPublic;

  onTodoUpdate: (updatedTodo: TodoModalSubmitProps) => void;
  onTodoDelete: (todoId: number) => void;
}

export default function TodoDetail({
  todo,
  onTodoUpdate,
  onTodoDelete,
}: Props) {
  const [title, setTitle] = useState<string>(todo.title);
  const [content, setContent] = useState<string>(todo.content || "");

  const targetDate = useMemo(() => {
    return new Date(todo.target_date);
  }, [todo.target_date]);

  const completed = useMemo(() => {
    return !!todo.completed_at;
  }, [todo.completed_at]);

  useEffect(() => {
    setTitle(todo.title);
    setContent(todo.content || "");
  }, [todo]);

  const handleDelete = () => {
    if (onTodoDelete) {
      onTodoDelete(todo.id);
    }
  };

  const handleTargetDateUpdate = (date: Date) => {
    onTodoUpdate({
      title,
      content,
      targetDate: date,
      completed: completed,
    });
  };

  const handleCheckedUpdate = (checked: boolean) => {
    onTodoUpdate({
      title,
      content,
      targetDate,
      completed: checked,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);

    onTodoUpdate({
      content,
      targetDate,
      completed,
      title: e.target.value,
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);

    onTodoUpdate({
      title,
      targetDate,
      completed,
      content: e.target.value,
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2">
        <Checkbox
          size="md"
          checked={completed}
          onCheckedChange={handleCheckedUpdate}
        />
        <DateTimePicker
          isSimple
          date={targetDate}
          onDateChange={handleTargetDateUpdate}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto px-2">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>할 일 삭제</AlertDialogTitle>
              <AlertDialogDescription>
                이 할 일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="mt-4 pr-2 flex-grow h-full">
        <TextAreaAutosize
          value={title}
          onChange={handleTitleChange}
          placeholder="제목 없음"
          maxLength={100}
          className="text-lg font-bold"
        />

        <TextAreaAutosize
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
          className="text-sm flex-grow min-h-full"
          minRows={20}
        />
      </ScrollArea>

      <div className="text-xs text-muted-foreground/50 text-right mt-4">
        {formatDateWithTime(new Date(todo.updated_at))}
      </div>
    </div>
  );
}
