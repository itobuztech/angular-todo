import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TODO } from '../interface/todo.interface';

@Injectable()
export class TodoService {
  private _todos$: BehaviorSubject<Array<TODO>> = new BehaviorSubject([]);
  todos = this._todos$.asObservable();


  constructor() { }

  create(todo: TODO) {
    const todos = this.getTodos();
    todos.push(todo);
    localStorage.setItem('todoApp_list', JSON.stringify(todos));
    this._todos$.next(todos);
  }

  getTodos() {
    return this._todos$.getValue();
  }

}
