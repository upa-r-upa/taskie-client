import { TodoPublic } from "@/api/generated";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo/TodoList";
import useTodoMutations from "@/hooks/useTodoMutations";
import { ScrollArea } from "@/components/ui/scroll-area";

import TodoDetail from "../../../components/todo/TodoDetail";

interface Props {
  date: Date;
  todoList: Array<TodoPublic>;

  reloadTodoList: () => void;
}

export default function TodoSection({ date, todoList, reloadTodoList }: Props) {
  const {
    updateModalState,
    onAddTodo,
    onUpdateTodoSubmit,
    onUpdateTodoChecked,
    onDeleteTodo,
    updateTodoMutation,
    deleteTodoMutation,
    createTodoMutation,
    selectedTodo,
    setSelectedTodo,
  } = useTodoMutations(reloadTodoList);

  const isUpdateModalLoading =
    updateTodoMutation.isPending || deleteTodoMutation.isPending;

  return (
    <div className="flex sm:flex-row flex-col h-full gap-4">
      <div className="w-full sm:w-1/2 h-full flex flex-col gap-2">
        <TodoList
          todoList={todoList}
          selectedTodoId={selectedTodo?.id}
          onTodoClick={(todo) => setSelectedTodo(todo)}
          onTodoCheck={onUpdateTodoChecked}
        />

        <Button size="lg" className="w-full" onClick={() => onAddTodo(date)}>
          할 일 추가하기
        </Button>
      </div>

      <div className="w-full sm:w-1/2 h-full">
        {selectedTodo ? (
          <TodoDetail
            todo={selectedTodo}
            onTodoUpdate={reloadTodoList}
            onTodoDelete={onDeleteTodo}
          />
        ) : (
          <div className="text-center text-muted-foreground h-full flex items-center justify-center border rounded-lg">
            <div>
              <p>현재 선택된 할 일이 없어요.</p>
              <p>할 일을 클릭해서 확인해보세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
