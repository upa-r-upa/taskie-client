import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime } from "@/utils/time";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo/TodoList";
import useTodoMutations from "@/hooks/useTodoMutations";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex sm:flex-row flex-col h-full gap-4">
      <div className="w-full sm:w-1/2 h-full flex flex-col">
        <ScrollArea className="flex-1 mb-4 w-full">
          <div className="w-full pr-3">
            <TodoList
              todoList={todoList}
              onTodoClick={updateModalState.openModal}
              onTodoCheck={onUpdateTodoChecked}
            />
          </div>
        </ScrollArea>

        <Button
          size="lg"
          onClick={createModalState.openModal}
          className="w-full"
        >
          할 일 추가하기
        </Button>
      </div>

      <div className="w-full sm:w-1/2 h-full">
        {selectedTodo ? (
          <TodoDetail todo={selectedTodo} onTodoUpdate={reloadTodoList} />
        ) : (
          <div className="text-center text-muted-foreground h-full flex items-center justify-center border rounded-lg">
            <div>
              <p>현재 선택된 할 일이 없어요.</p>
              <p>할 일을 클릭해서 확인해보세요.</p>
            </div>
          </div>
        )}
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
    </div>
  );
}
