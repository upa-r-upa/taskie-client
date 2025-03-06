import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

import {
  TodoModalSubmitProps,
  TodoUpdateInputParameter,
} from "@/pages/MainPage/types";
import { TodoPublic } from "@/api/generated";
import { todoApi } from "@/api/client";
import { sendEvent } from "@/lib/analytics";

import useModal from "./useModal";
import useModalWithState from "./useModalWithState";

import { useModalStore } from "@/lib/store";

export default function useTodoMutations(reloadTodoList: () => void) {
  const createModalState = useModal();
  const updateModalState = useModalWithState<TodoPublic>();

  const onAddTodoSubmit = (todo: TodoModalSubmitProps) => {
    createTodoMutation.mutate({
      content: todo.content,
      title: todo.title,
      order: 0,
      target_date: todo.targetDate.toISOString(),
    });
  };

  const onDeleteTodo = () => {
    if (!updateModalState.visibleState) return;

    deleteTodoMutation.mutate(updateModalState.visibleState.id);
  };

  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      sendEvent("Todo", "Create", "Success");
      createModalState.closeModal();
      updateModalState.closeModal();
      reloadTodoList();
    },
    onError: (error: AxiosError) => {
      sendEvent("Todo", "Create", "Error", error.response?.status || 0);
      toast.error("할일 추가에 실패했습니다.");
    },
  });

  const onTodoUpdateSuccess = () => {
    updateModalState.closeModal();
    reloadTodoList();
  };

  const updateTodoMutation = useMutation({
    mutationFn: (input: TodoUpdateInputParameter) =>
      todoApi.updateTodo(input.id, input.update),
    onSuccess: () => {
      sendEvent("Todo", "Update", "Success");
      onTodoUpdateSuccess();
    },
    onError: (error: AxiosError) => {
      sendEvent("Todo", "Update", "Error", error.response?.status || 0);
      toast.error("할일 수정에 실패했습니다.");
    },
  });

  const onUpdateTodoSubmit = (todo: TodoModalSubmitProps) => {
    if (!updateModalState.visibleState) return;

    updateTodoMutation.mutate({
      id: updateModalState.visibleState.id,
      update: {
        ...todo,
        completed: !!updateModalState.visibleState.completed_at,
        target_date: todo.targetDate.toISOString(),
      },
    });
  };

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      sendEvent("Todo", "Delete", "Success");
      onTodoUpdateSuccess();
    },
    onError: (error: AxiosError) => {
      sendEvent("Todo", "Delete", "Error", error.response?.status || 0);
      toast.error("할일 삭제에 실패했습니다.");
    },
  });

  const onUpdateTodoChecked = (todo: TodoPublic, checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id,
      update: {
        ...todo,
        completed: checked,
      },
    });
  };

  return {
    updateModalState,
    createModalState,
    onUpdateTodoSubmit,
    onAddTodoSubmit,
    onDeleteTodo,
    onUpdateTodoChecked,
    deleteTodoMutation,
    updateTodoMutation,
    createTodoMutation,
  };
}
