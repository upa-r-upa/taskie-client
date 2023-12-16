import { useEffect, useRef, useState } from "react";
import { BsFillTrashFill, BsPlusLg } from "react-icons/bs";

import { InnerTodo, Todo } from "../../types/todo";

interface Props {
  todoList: Array<Todo>;
}

export default function TodoSection({ todoList }: Props) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!selectedTodo) return;

    modalRef.current?.showModal();
  }, [selectedTodo]);

  const handleClickTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const renderTodoList = (list: Array<Todo>): JSX.Element[] => {
    return list.map((item) => {
      return (
        <li key={item.id} className="mb-2 flex items-center">
          <input type="checkbox" className="checkbox" />
          <span
            onClick={() => handleClickTodo(item)}
            className="label-text pl-2"
          >
            {item.title}
          </span>
        </li>
      );
    });
  };

  const renderInnerTodoList = (list: Array<InnerTodo>): JSX.Element[] => {
    return list.map((todo, index) => {
      return (
        <li key={index} className="mb-2 flex items-center">
          <input type="checkbox" className="checkbox checkbox-sm" />
          <input
            type="text"
            defaultValue={todo.title}
            className="input input-ghost w-full input-sm"
          />
          <button className="btn btn-ghost btn-sm text-error">
            <BsFillTrashFill />
          </button>
        </li>
      );
    });
  };

  const renderTodoModal = (todo: Todo | null): JSX.Element | null => {
    if (!todo) return null;

    return (
      <dialog
        key={todo.id}
        id="todo_modal"
        className="modal modal-bottom"
        ref={modalRef}
      >
        <div className="modal-box">
          <input
            type="text"
            defaultValue={todo.title}
            className="input input-ghost w-full text-lg text-center mb-2"
          />

          <div className="max-h-80 overflow-y-auto">
            <textarea
              defaultValue={todo.content}
              placeholder="투두 내용을 보충 설명해보세요."
              className="textarea textarea-bordered w-full h-36"
            />
            {todo.innerTodoList && (
              <ul className="mt-3">
                {renderInnerTodoList(todo.innerTodoList)}
              </ul>
            )}

            <button className="btn btn-sm">
              <BsPlusLg />
              투두 추가
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">닫기</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <>
      {renderTodoList(todoList)}

      {renderTodoModal(selectedTodo)}
    </>
  );
}
