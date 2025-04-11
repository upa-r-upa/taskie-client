import { useEffect, useState } from "react";
import { Calendar, Trash2 } from "lucide-react";

import { TodoPublic } from "@/api/generated";
import { cn } from "@/lib/utils";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatDateWithTime } from "@/utils/time";
import DateTimePicker from "@/components/ui/date-time-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
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

  return (
    <div className="border rounded-lg p-4 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-4">
        <Checkbox checked={!!todo.completed_at} />
        <DateTimePicker
          isSimple
          date={targetDate}
          onDateChange={(date) => setTargetDate(date)}
        />
        <Button variant="outline" size="icon" className="ml-auto">
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>

      <div className="mt-4">
        <AutoResizeTextarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목 없음"
          rows={1}
          maxLength={100}
          className="w-full resize-none border-none bg-transparent p-0 text-lg focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none font-bold"
        />
      </div>

      <div className="w-full pr-3 flex-grow">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요."
          className="w-full h-full resize-none border-none bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
        />
      </div>

      <div className="text-xs text-muted-foreground/50 text-right mt-4">
        {formatDateWithTime(new Date(todo.updated_at))}
      </div>
    </div>
  );
}
