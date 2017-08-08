import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'todo-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  todo;
  todoForm: FormGroup;
  id: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _td: TodoService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.todoForm = this._fb.group({
      id: [],
      title: [''],
      status: []
    });

    this._activatedRoute.params
      .switchMap(params => this._td.getTodo(params.id))
      .subscribe(todo => {
        console.log('Todo item', todo);
        this.todoForm.patchValue(todo);
      });
  }

  update() {
    const todo = this.todoForm.value;
    if (todo.id) {
      this._td.put(todo);
    }else {
      this._td.create(todo);
    }
    this._router.navigate(['/todos/list']);
  }

}
