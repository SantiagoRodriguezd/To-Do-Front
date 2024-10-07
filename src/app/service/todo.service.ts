import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = Math.random();

  private apiUrl = 'http://localhost:8080/tasks';

  constructor() {}

  async getTodos(userId: number | null): Promise<Todo[]> {
    if (!userId) {
      throw new Error('El usuario no está autenticado');
    }

    const response = await axios.get<Todo[]>(`${this.apiUrl}?userId=${userId}`);
    return response.data;
  }

  async addTodo(title: string, userId: number): Promise<Todo> {
    const newTodo = {
      title,
      completed: false,
      priority: 'low',
      userId,
    };

    const response = await axios.post<Todo>(this.apiUrl, newTodo);
    return response.data;
  }

  async updateTodo(todo: Todo): Promise<void> {
    await axios.put(`${this.apiUrl}/${todo.id}`, todo);
  }

  async deleteTodo(todoId: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${todoId}`);
  }
}
