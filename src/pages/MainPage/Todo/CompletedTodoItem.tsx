import { TodoItemProps } from "./types";

interface Props extends TodoItemProps {}

export default function CompletedTodoItem({
  todo,
  onTodoClick,
  onTodoCheck,
}: Props) {
  return (
    <li className="mb-2 px-4 card-bordered rounded-md flex items-center h-16">
      <div className="flex-1 overflow-hidden" onClick={() => onTodoClick(todo)}>
        {todo.title ? (
          <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap line-through">
            {todo.title}
          </p>
        ) : (
          <p className="text-gray-400 line-through">이름이 없습니다.</p>
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
          checked={true}
          className="checkbox checkbox-primary checkbox-sm rounded-full"
          onChange={({ target: { checked } }) => onTodoCheck(todo, checked)}
        />
      </div>
    </li>
  );
}
