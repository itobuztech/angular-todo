import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TODO } from '../../interface/todo.interface';


@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todos: Array<TODO>;

  constructor(
    private _td: TodoService
  ) { }

  ngOnInit() {
    this._td.todos.subscribe(todos => {
      this.todos = todos;
    })
  }

}
