import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TODO } from '../interface/todo.interface';

@Injectable()
export class TodoService {
  private _todos$: BehaviorSubject<Array<TODO>> = new BehaviorSubject([]);
  todos = this._todos$.asObservable();


  constructor() {
    this.setTodos();
  }

  updateStore(todos) {
    this._todos$.next(todos);
    localStorage.setItem('todoApp_list', JSON.stringify(todos));
  }

  create(todo: TODO) {
    const todos = this._todos$.getValue();
    todo.id = new Date().getTime();
    todos.push(todo);
    this.updateStore(todos);
  }

  put(todo: TODO) {
    const todos = this._todos$.getValue();
    const index = todos.findIndex(item => item.id === todo.id);
    todos[index] = todo;
    this.updateStore(todos);
  }

  setTodos() {
    const todos = localStorage.getItem('todoApp_list') ? JSON.parse(localStorage.getItem('todoApp_list')) : [];
    this._todos$.next(todos);
  }

  delete(id) {
    const todos = this._todos$.getValue();
    const index = todos.findIndex(item => item.id === id);
    todos.splice(index, 1);
    this.updateStore(todos);
  }

  getTodo(id) {
    const todos = this._todos$.getValue();
    const index = todos.findIndex(item => item.id === id);
    return todos[index];
  }
}
