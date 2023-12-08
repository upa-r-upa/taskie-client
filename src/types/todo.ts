export interface Todo {
  id: number;
  title: string;
  content?: string;
  innerTodoList?: Array<InnerTodo>;
}

export interface InnerTodo {
  title: string;
  isDone: boolean;
}
