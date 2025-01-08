import { getFormatTime, isToday } from "@/utils/time";
import { TodoItemProps } from "@/pages/MainPage/Todo/types";

interface Props extends TodoItemProps {}

export default function IncompleteTodoItem({
  todo,
  onTodoCheck,
  onTodoClick,
}: Props) {
  const formattedDate =
    isToday(todo.target_date) && getFormatTime(todo.target_date);

  return (
    <li className="mb-2 px-4 card-bordered rounded-md flex items-center h-16">
      <div className="flex-1 overflow-hidden" onClick={() => onTodoClick(todo)}>
        {formattedDate && (
          <p className="text-xs whitespace-nowrap">{formattedDate}</p>
        )}

        {todo.title ? (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {todo.title}
          </p>
        ) : (
          <p className="text-gray-400">이름이 없습니다.</p>
        )}

        <div className="flex">
          {todo.content && (
            <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
              {todo.content}
            </p>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 ml-4">
        <input
          type="checkbox"
          checked={!!todo.completed_at}
          className="checkbox checkbox-primary checkbox-sm rounded-full"
          onChange={({ target: { checked } }) => onTodoCheck(todo, checked)}
        />
      </div>
    </li>
  );
}
