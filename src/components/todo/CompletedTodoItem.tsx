import { TodoItemProps } from "../../pages/MainPage/Todo/types";

interface Props extends TodoItemProps {
  isSimple?: boolean;
}

export default function CompletedTodoItem({
  todo,
  isSimple,
  onTodoClick,
  onTodoCheck,
}: Props) {
  const renderTitle = () => {
    if (!todo.title) {
      <p className="text-gray-400 line-through">이름이 없습니다.</p>;
    }

    return (
      <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap line-through">
        {todo.title}
      </p>
    );
  };

  const renderContent = () => {
    if (isSimple) return;

    return (
      <div className="flex">
        {todo.content && (
          <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            {todo.content}
          </p>
        )}
      </div>
    );
  };

  return (
    <li
      className={`mb-2 px-4 card-bordered rounded-md flex items-center ${isSimple ? "h-10" : "h-16"}`}
    >
      <div className="flex-1 overflow-hidden" onClick={() => onTodoClick(todo)}>
        {renderTitle()}

        {renderContent()}
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
