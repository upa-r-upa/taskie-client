import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime } from "@/utils/time";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo/TodoList";
import useTodoMutations from "@/hooks/useTodoMutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TodoModal from "./TodoModal";
import TodoDetail from "./TodoDetail";

interface Props {
  date: Date;
  todoList: Array<TodoPublic>;

  reloadTodoList: () => void;
}

export default function TodoSection({ date, todoList, reloadTodoList }: Props) {
  const {
    createModalState,
    updateModalState,
    onAddTodoSubmit,
    onUpdateTodoSubmit,
    onUpdateTodoChecked,
    onDeleteTodo,
    updateTodoMutation,
    deleteTodoMutation,
    createTodoMutation,
  } = useTodoMutations(reloadTodoList);

  const { visibleState: selectedTodo } = updateModalState;

  const isUpdateModalLoading =
    updateTodoMutation.isPending || deleteTodoMutation.isPending;

  return (
    <>
      <div>
        <TodoList
          todoList={todoList}
          onTodoClick={updateModalState.openModal}
          onTodoCheck={onUpdateTodoChecked}
        />

        <Button
          size="lg"
          onClick={createModalState.openModal}
          className="mt-4 w-full"
        >
          할 일 추가하기
        </Button>
      </div>

      <div>
        <TodoDetail todo={selectedTodo} onTodoUpdate={reloadTodoList} />
      </div>

      <TodoModal
        title="할 일 추가하기"
        isOpened={createModalState.isModalOpened}
        setIsOpened={createModalState.setIsOpened}
        targetDate={getDateWithoutTime(date)}
        onTodoSubmit={onAddTodoSubmit}
        isLoading={createTodoMutation.isPending}
        submitButtonLabel="할 일 추가하기"
      />

      {selectedTodo && (
        <TodoModal
          deletable
          isOpened={updateModalState.isOpened}
          setIsOpened={updateModalState.setIsOpened}
          submitButtonLabel="할 일 수정하기"
          title="할 일 수정하기"
          initialTodo={{ ...selectedTodo }}
          isLoading={isUpdateModalLoading}
          targetDate={
            selectedTodo?.target_date
              ? new Date(selectedTodo.target_date)
              : new Date()
          }
          onTodoSubmit={onUpdateTodoSubmit}
          onModalInvisible={updateModalState.invisibleModal}
          onTodoDelete={onDeleteTodo}
        />
      )}
    </>
  );
}
