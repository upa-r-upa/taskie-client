import { getFormatTime, isMidnight } from "@/utils/time";
import { cn } from "@/lib/utils";
import { TodoPublic } from "@/api/generated";

import { Checkbox } from "../ui/checkbox";

interface Props {
  todo: TodoPublic;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

export default function TodoItem({ todo, onTodoCheck, onTodoClick }: Props) {
  const { title, content, target_date, completed_at } = todo;

  return (
    <div className="flex items-center space-x-4 rounded-md border transition-colors bg-card hover:bg-accent cursor-pointer p">
      <div
        className="flex-1 space-y-1 p-3 pr-0 overflow-hidden"
        onClick={() => onTodoClick(todo)}
      >
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "flex-1 text-sm leading-none overflow-hidden text-ellipsis whitespace-nowrap",
              completed_at && "text-muted-foreground/70 line-through"
            )}
          >
            {title || "제목이 없습니다."}
          </p>

          <span className="text-xs text-muted-foreground">
            {!isMidnight(target_date) && getFormatTime(target_date)}
          </span>
        </div>

        {content && (
          <p
            className={cn(
              "text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap",
              completed_at && "text-muted-foreground/50"
            )}
          >
            {content}
          </p>
        )}
      </div>

      <div className="pr-2">
        <Checkbox
          checked={!!completed_at}
          onCheckedChange={(checked) => onTodoCheck(todo, !!checked)}
        />
      </div>
    </div>
  );
}
