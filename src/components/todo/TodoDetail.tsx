import { useEffect, useState } from "react";
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

interface Props {
  todo: TodoPublic;
  onTodoUpdate?: (updatedTodo: TodoPublic) => void;
  onTodoDelete?: (todoId: number) => void;
}

export default function TodoDetail({
  todo,
  onTodoUpdate,
  onTodoDelete,
}: Props) {
  const [title, setTitle] = useState<string>(todo.title);
  const [content, setContent] = useState<string>(todo.content || "");
  const [targetDate, setTargetDate] = useState<Date>(
    new Date(todo.target_date)
  );

  useEffect(() => {
    setTitle(todo.title);
    setContent(todo.content || "");
    setTargetDate(new Date(todo.target_date));
  }, [todo]);

  const handleDelete = () => {
    if (onTodoDelete) {
      onTodoDelete(todo.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-4">
        <Checkbox size="md" checked={!!todo.completed_at} />
        <DateTimePicker
          isSimple
          date={targetDate}
          onDateChange={(date) => setTargetDate(date)}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto">
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

      <ScrollArea className="mt-4 flex-grow pr-2">
        <TextAreaAutosize
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목 없음"
          maxLength={100}
          className="text-lg font-bold"
        />

        <TextAreaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요."
          className="text-sm min-h-full"
        />
      </ScrollArea>

      <div className="text-xs text-muted-foreground/50 text-right mt-4">
        {formatDateWithTime(new Date(todo.updated_at))}
      </div>
    </div>
  );
}
