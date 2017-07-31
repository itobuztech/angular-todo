import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  editIndex;
  searchterm;
  report;

  constructor(
    private _td: TodoService
  ) {}

  ngOnInit() {
    this._td.report.subscribe(res => {
      this.report = res;
    });
  }
}
