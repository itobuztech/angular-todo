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
  searchterm: string;
  todos$;

  constructor(
    private _td: TodoService
  ) { }

  ngOnInit() {
    this._td.search
      .debounceTime(500)
      .subscribe(term => {
        this.searchterm = term;
      });
    this._td.todos.subscribe(res => {
      console.log(res);
      this.todos = res;
    }, err => {
      console.log(err);
    });
  }

  delete(id) {
    this._td.delete(id).subscribe(res => {
      console.log('deleted', res);
    });
  }

  changeStatus(status, todo: TODO) {
    todo.status = status;
    this._td.put(todo).subscribe();
  }

}
