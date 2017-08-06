import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TODO } from '../interface/todo.interface';

@Injectable()
export class TodoService {
  private _todos$: BehaviorSubject<Array<TODO>> = new BehaviorSubject([]);
  todos = this._todos$.asObservable();

  private _report$: BehaviorSubject<Object> = new BehaviorSubject({});
  report = this._report$.asObservable();

  private _search$: BehaviorSubject<string> = new BehaviorSubject(null);
  search = this._search$.asObservable();


  constructor() {
    this.setTodos();
    this.makeReport(this._todos$.getValue());
  }

  makeReport(todos) {
    const report = {
      completed: 0,
      pending: 0,
      total: todos.length
    };
    todos.map(item => {
      if (item.status) {
        report.completed = report.completed + 1;
      }else {
        report.pending = report.pending + 1;
      }
    });
    this._report$.next(report);
  }

  updateStore(todos) {
    this._todos$.next(todos);
    localStorage.setItem('todoApp_list', JSON.stringify(todos));
    this.makeReport(todos);
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

  getTodo(id: number) {
    const todos = this._todos$.getValue();
    const index = todos.findIndex(item => item.id === id);
    return todos[index];
  }

  doSearch(searchTerm) {
    this._search$.next(searchTerm);
  }
}
