import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from '../compartido/datos.service';
import { Todo } from '../compartido/todo.model';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  showValidationErrors!: boolean;

  constructor(private datosService: DatosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.datosService.getAllTodos()
  }

  onFormSubmit(form: NgForm){
    console.log('Formulario Subido')
    console.log(form)

    if (!form.valid) return alert("Formulario Invalido")//this.showValidationErrors = true,

    this.datosService.agregarTodo(new Todo(form.value.text))

    //this.showValidationErrors = false
    //form.reset()
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo){
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.datosService.editarTodo(index, result)
      }
    })
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo)

    this.datosService.borrarTodo(index)
  }
}
