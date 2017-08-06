import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TODO } from '../../interface/todo.interface';


@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todos: Array<TODO>;
  searchterm: string;

  constructor(
    private _td: TodoService
  ) { }

  ngOnInit() {
    this._td.todos.subscribe(todos => {
      this.todos = todos;
    });
    this._td.search
    .debounceTime(500)
    .subscribe(term => {
      this.searchterm = term;
    });
  }

  delete(id) {
    this._td.delete(id);
  }

  changeStatus(status, todo: TODO) {
    todo.status = status;
    this._td.put(todo);
  }

}
