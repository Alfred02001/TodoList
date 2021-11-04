import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  todos: Todo[] = [
    new Todo('esto es un texto', false),
    new Todo('Ejemplo',true)
  ];

  constructor() { }

  getAllTodos() {
    return this.todos
  }

  agregarTodo(todo: Todo) {
    this.todos.push(todo)
  }

  editarTodo(index: number, editarTodo: Todo) {
    this.todos[index] = editarTodo
  }

  borrarTodo(index: number) {
    this.todos.splice(index, 1)
  }
}
