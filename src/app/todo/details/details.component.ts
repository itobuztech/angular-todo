import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'todo-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  todo;
  todoForm: FormGroup;

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

    this._activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.todo = this._td.getTodo(+params.id);
        console.log(this.todo);
        this.todoForm.patchValue(this.todo);
      }
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
