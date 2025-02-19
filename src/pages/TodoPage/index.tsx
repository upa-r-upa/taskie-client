import { useState } from "react";

import useTodoMutations from "@/hooks/useTodoMutations";
import { queryClient } from "@/api/client";
import { getDateWithoutTime } from "@/utils/time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import TodoModal from "../MainPage/Todo/TodoModal";

import IncompleteTodoTab from "./IncompleteTodoTab";
import CompleteTodoTab from "./CompleteTodoTab";

enum TabType {
  incomplete = "incomplete",
  complete = "complete",
}

export function TodoAddButton({
  onTodoAdd,
  classNames,
}: {
  onTodoAdd: (title: string) => void;
  classNames?: string;
}) {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleAddTodo = () => {
    if (!todoTitle.trim()) return;
    onTodoAdd(todoTitle);
    setTodoTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing && e.key === "Enter") return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", classNames)}>
      <Input
        className="flex-1 text-sm"
        placeholder="할 일을 입력해 추가하세요."
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAddTodo}>추가</Button>
    </div>
  );
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

  const handleTodoAdd = (title: string) => {
    onAddTodoSubmit({
      title,
      targetDate: getDateWithoutTime(new Date()),
      content: "",
    });
  };

  return (
    <>
      <div className="mx-auto grid grid-cols-1 max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight">할 일</h2>

        <Tabs defaultValue={TabType.incomplete}>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 my-3">
            <TabsList className="flex items-center w-max">
              <TabsTrigger value={TabType.incomplete}>진행 예정</TabsTrigger>
              <TabsTrigger value={TabType.complete}>완료</TabsTrigger>
            </TabsList>
            <TodoAddButton onTodoAdd={handleTodoAdd} classNames="flex-1" />
          </div>

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
