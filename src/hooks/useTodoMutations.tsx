import { useMutation } from "@tanstack/react-query";

import { useMessageStore } from "@/state/useMessageStore";
import {
  TodoModalSubmitProps,
  TodoUpdateInputParameter,
} from "@/pages/MainPage/types";
import { TodoPublic } from "@/api/generated";
import { todoApi } from "@/api/client";

import useModal from "./useModal";
import useModalWithState from "./useModalWithState";

export default function useTodoMutations(reloadTodoList: () => void) {
  const addMessage = useMessageStore((state) => state.addMessage);

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

  const addFailureMessage = (message: string) => {
    addMessage({
      message: message,
      type: "error",
    });
  };

  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      createModalState.closeModal();
      updateModalState.closeModal();
      reloadTodoList();
    },
    onError: () => addFailureMessage("할일 추가에 실패했습니다."),
  });

  const onTodoUpdateSuccess = () => {
    updateModalState.closeModal();
    reloadTodoList();
  };

  const updateTodoMutation = useMutation({
    mutationFn: (input: TodoUpdateInputParameter) =>
      todoApi.updateTodo(input.id, input.update),
    onSuccess: onTodoUpdateSuccess,
    onError: () => addFailureMessage("할일 수정에 실패했습니다."),
  });

  const onUpdateTodoSubmit = (todo: TodoModalSubmitProps) => {
    if (!updateModalState.modalState) return;

    updateTodoMutation.mutate({
      id: updateModalState.modalState.id,
      update: {
        ...todo,
        completed: !!updateModalState.modalState.completed_at,
        target_date: todo.targetDate.toISOString(),
      },
    });
  };

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: onTodoUpdateSuccess,
    onError: () => addFailureMessage("할일 삭제에 실패했습니다."),
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
    onUpdateTodoChecked,
    deleteTodoMutation,
    updateTodoMutation,
    createTodoMutation,
  };
}
