import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  editIndex;
  searchterm;
  report;
  constructor(
    private _td: TodoService
  ) { }

  ngOnInit() {
     this._td.report.subscribe(res => {
      this.report = res;
    });
  }

}
