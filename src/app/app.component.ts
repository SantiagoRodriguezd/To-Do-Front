import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../app/model/todo.model';
import { TodoService } from '../app/service/todo.service';
import { UserService } from '../app/service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule ],
})
export class AppComponent {

  todos: Todo[] = [];
  newTodoTitle: string = '';
  nextId: number = 1;
  newTodoPriority: string = 'low';
  filter: string = 'all';
  isAuthenticated: boolean = false;
  currentUserId: number | null = null;
  user: { id: number; username: string } | null = null;

  constructor(private todoService: TodoService,private authService: UserService) { }

  ngOnInit(): void {
    this.showLoginDialog();
  }

  async showLoginDialog() {
    const { value: formValues } = await Swal.fire({
      title: 'Iniciar sesión To Do App',
      html: `
        <p>Por favor ingresa tus credenciales para iniciar sesión.</p>
        <input id="username" class="swal2-input" placeholder="Usuario">
        <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      backdrop: false,
      focusConfirm: false,
      confirmButtonText: 'Iniciar sesión',
      preConfirm: () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (!username || !password) {
          Swal.showValidationMessage(`Por favor ingresa tu usuario y contraseña`);
        }
        return { username, password };
      }
    });

    if (formValues) {
      const { username, password } = formValues;
      const user = await this.authService.login(username, password);
      if (user) {
        this.isAuthenticated = true;
        this.currentUserId = user.id;
        this.user = user;
        localStorage.setItem('userId', user.id.toString());
        Swal.fire('¡Bienvenido!', 'Has iniciado sesión correctamente.', 'success');
        this.getTodos();
      } else {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
        this.showLoginDialog();
      }
    }
  }

  async getTodos(): Promise<void> {
    try {
      if (this.currentUserId) {
        this.todos = await this.todoService.getTodos(this.currentUserId);
      } else {
        console.error('No se pudo obtener el userId');
      }
    } catch (error) {
      console.error('Error al obtener los TODOs:', error);
    }
  }


  getTitle(): string {
    if (this.filter === 'completed') {
      return 'Tareas Completadas';
    } else if (this.filter === 'incomplete') {
      return 'Tareas Incompletas';
    }
    return 'Todas las Tareas';
  }

  getFilteredTodos(): Todo[] {
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    } else if (this.filter === 'incomplete') {
      return this.todos.filter(todo => !todo.completed);
    }
    return this.todos;
  }

  async addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo = await this.todoService.addTodo(this.newTodoTitle, this.currentUserId!);
      this.todos.push(newTodo);
      this.newTodoTitle = '';

      Swal.fire({
        title: 'Tarea agregada!',
        text: 'Tu nueva tarea ha sido añadida.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  async updateTodo(todo: Todo): Promise<void> {

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar esta tarea?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar!',
      cancelButtonText: 'Cancelar'
    });


    if (result.isConfirmed) {
      try {
        await this.todoService.updateTodo(todo);

        Swal.fire('¡Actualizado!', 'La tarea ha sido actualizada.', 'success');
      } catch (error) {

        Swal.fire('Error', 'No se pudo actualizar la tarea. Inténtalo de nuevo.', 'error');
        console.error('Error al actualizar el TODO:', error);
      }
    }
  }

  async deleteTodo(todoId: number) {

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta tarea después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    });


    if (result.isConfirmed) {

      try {
        await this.todoService.deleteTodo(todoId);

        this.todos = this.todos.filter(todo => todo.id !== todoId);

        Swal.fire('¡Eliminado!', 'La tarea ha sido eliminada.', 'success');
      } catch (error) {

        Swal.fire('Error', 'No se pudo eliminar la tarea. Inténtalo de nuevo.', 'error');
        console.error('Error al eliminar la tarea:', error);
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  }

  getProgress() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    return total > 0 ? (completed / total) * 100 : 0;
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserId = null;
    this.user = null;
    localStorage.removeItem('userId');
    Swal.fire('Cierre de sesión', 'Has cerrado sesión correctamente.', 'success').then(() => {
      this.showLoginDialog();
    });
  }
}
