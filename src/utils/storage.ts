import { Todo } from '../types/todo';

export const StorageKeys = {
  TODOS: 'todos'
} as const;

export const storage = {
  async getTodos(): Promise<Todo[]> {
    const result = await chrome.storage.local.get(StorageKeys.TODOS);
    return result[StorageKeys.TODOS] || [];
  },

  async setTodos(todos: Todo[]): Promise<void> {
    await chrome.storage.local.set({ [StorageKeys.TODOS]: todos });
  },

  async addTodo(todo: Todo): Promise<void> {
    const todos = await this.getTodos();
    todos.push(todo);
    await this.setTodos(todos);
  },

  async updateTodo(updatedTodo: Todo): Promise<void> {
    const todos = await this.getTodos();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      await this.setTodos(todos);
    }
  },

  async deleteTodo(id: string): Promise<void> {
    const todos = await this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await this.setTodos(filteredTodos);
  },

  async exportTodos(): Promise<string> {
    const todos = await this.getTodos();
    return JSON.stringify(todos, null, 2);
  }
}; 