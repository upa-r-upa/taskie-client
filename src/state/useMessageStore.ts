import { create } from "zustand";

export type MessageType = "info" | "error" | "success" | "warning";

export interface Message {
  message: React.ReactNode;

  description?: React.ReactNode;
  type?: MessageType;
}

interface MessageState {
  messages: Array<Message>;

  addMessage: (message: Message) => void;
  clearMessage: (idx: number) => void;

  clearAllMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => {
      return {
        messages: [...state.messages, message],
      };
    }),

  clearMessage: (idx) =>
    set((state) => ({
      messages: state.messages.filter((_, index) => index !== idx),
    })),

  clearAllMessages: () =>
    set(() => ({
      messages: [],
    })),
}));
