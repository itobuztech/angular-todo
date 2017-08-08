import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { TODO } from '../interface/todo.interface';

@Injectable()
export class TodoService {
  private _todos$: BehaviorSubject<Array<TODO>> = new BehaviorSubject([]);
  todos = this._todos$.asObservable();

  private _report$: BehaviorSubject<Object> = new BehaviorSubject({});
  report = this._report$.asObservable();

  private _search$: BehaviorSubject<string> = new BehaviorSubject(null);
  search = this._search$.asObservable();


  constructor(
    private _http: Http
  ) {
    this.getAll().subscribe();
  }

  getAll() {
    return this._http.get('/todo')
      .map(todos => {
        this._todos$.next(todos.json());
        this.makeReport(this._todos$.getValue());
        return todos.json();
      })
      .catch(err => Observable.throw(err));
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
      } else {
        report.pending = report.pending + 1;
      }
    });
    this._report$.next(report);
  }

  updateStore(todos) {
    this._todos$.next(todos);
    this.makeReport(todos);
  }

  create(todo: TODO) {
    return this._http.post('/todo/', todo)
      .map(res => {
        const todos = this._todos$.getValue();
        todos.push(res.json());
        this.updateStore(todos);
        return res.json();
      })
      .catch(err => Observable.throw(err));
  }

  put(todo: TODO) {
    return this._http.put(`/todo/${todo.id}`, todo)
      .map(res => {
        const todos = this._todos$.getValue();
        const index = todos.findIndex(item => item.id === todo.id);
        todos[index] = todo;
        this.updateStore(todos);
        return res.json();
      })
      .catch(err => Observable.throw(err));
  }

  delete(id) {
    return this._http.delete(`/todo/${id}`)
      .map(todo => {
        const todos = this._todos$.getValue();
        const index = todos.findIndex(item => item.id === id);
        todos.splice(index, 1);
        this.updateStore(todos);
        return todo.json();
      })
      .catch(err => Observable.throw(err));
  }

  getTodo(id: number) {
    return this._http.get('/todo/' + id)
      .map(todo => todo.json())
      .catch(err => Observable.throw(err));
  }

  doSearch(searchTerm) {
    this._search$.next(searchTerm);
  }
}
