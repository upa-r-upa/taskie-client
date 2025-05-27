import { cn } from "@/lib/utils";
import { TodoPublic } from "@/api/generated";
import { formatRelativeDate, getRelativeDateStatus } from "@/utils/time";

import { Checkbox } from "../ui/checkbox";

interface Props {
  todo: TodoPublic;

  isSelected: boolean;

  onTodoClick: (todoId: number) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

export default function TodoItem({
  todo,
  isSelected,
  onTodoCheck,
  onTodoClick,
}: Props) {
  const { title, content, target_date, completed_at } = todo;

  const getTextColor = () => {
    const status = getRelativeDateStatus(target_date);

    if (status === "prev") return "text-destructive";
    else if (status === "today") return "text-primary";
    else return "text-blue-400";
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md border transition-colors bg-card hover:bg-accent cursor-pointer",
        isSelected && "bg-accent border-muted-foreground/50"
      )}
    >
      <div
        className="flex-1 space-y-1 p-3 pr-0 overflow-hidden w-0 min-w-0"
        onClick={() => onTodoClick(todo.id)}
      >
        <div className="flex items-center gap-2 max-w-full overflow-hidden">
          <p
            className={cn(
              "flex-1 text-sm leading-none overflow-hidden text-ellipsis whitespace-nowrap w-0",
              completed_at && "text-muted-foreground/70 line-through",
              !title && "text-muted-foreground"
            )}
          >
            {title || "제목 없음"}
          </p>

          {!completed_at && (
            <span
              className={cn(
                "text-xs text-blue-400 flex-shrink-0 ml-2",
                getTextColor()
              )}
            >
              {formatRelativeDate(target_date)}
            </span>
          )}
        </div>

        {content && (
          <p
            className={cn(
              "text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
              completed_at && "text-muted-foreground/50"
            )}
          >
            {content}
          </p>
        )}
      </div>

      <div className="p-2 flex-shrink-0">
        <Checkbox
          checked={!!completed_at}
          onCheckedChange={(checked) => onTodoCheck(todo, !!checked)}
        />
      </div>
    </div>
  );
}
