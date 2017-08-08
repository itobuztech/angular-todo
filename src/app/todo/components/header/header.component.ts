import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  todoCreateForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _td: TodoService
  ) { }

  ngOnInit() {
    this.todoCreateForm = this._fb.group({
      title: ['', Validators.required],
      id: [],
      status: [false]
    });
    this.searchForm = this._fb.group({
      term: []
    });

    // auto search
    this.searchForm.valueChanges
      .debounceTime(400)
      .subscribe(res => {
        this._td.doSearch(this.searchForm.controls['term'].value);
      });
  }


  add() {
    console.log('New todo data: ', this.todoCreateForm.value);
    this._td.create(this.todoCreateForm.value).subscribe(res => {
      console.log(res);
      this.todoCreateForm.reset();
    });
  }
}
