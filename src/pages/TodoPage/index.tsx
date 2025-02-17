import { useState } from "react";

import useTodoMutations from "@/hooks/useTodoMutations";
import { queryClient } from "@/api/client";
import { getDateWithoutTime } from "@/utils/time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TodoModal from "../MainPage/Todo/TodoModal";

import IncompleteTodoTab from "./IncompleteTodoTab";
import CompleteTodoTab from "./CompleteTodoTab";

enum TabType {
  incomplete = "incomplete",
  complete = "complete",
}

export default function TodoPage() {
  const [date] = useState(() => new Date());

  const reloadTodoList = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["todos"],
    });
  };

  const {
    createModalState,
    updateModalState,
    onAddTodoSubmit,
    onDeleteTodo,
    onUpdateTodoSubmit,
    onUpdateTodoChecked,
    updateTodoMutation,
    deleteTodoMutation,
    createTodoMutation,
  } = useTodoMutations(reloadTodoList);

  const { visibleState: selectedTodo } = updateModalState;

  const isUpdateModalLoading =
    updateTodoMutation.isPending || deleteTodoMutation.isPending;

  return (
    <>
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Todo</h2>

        <Tabs defaultValue={TabType.incomplete}>
          <TabsList className="flex items-center w-max">
            <TabsTrigger value={TabType.incomplete}>진행 예정</TabsTrigger>
            <TabsTrigger value={TabType.complete}>완료</TabsTrigger>
          </TabsList>

          <TabsContent value={TabType.incomplete}>
            <IncompleteTodoTab
              onTodoCheck={onUpdateTodoChecked}
              onTodoClick={updateModalState.openModal}
            />
          </TabsContent>

          <TabsContent value={TabType.complete}>
            <CompleteTodoTab
              onTodoCheck={onUpdateTodoChecked}
              onTodoClick={updateModalState.openModal}
            />
          </TabsContent>
        </Tabs>
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
