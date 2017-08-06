import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() editIndex;

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
        this.search();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.editIndex.firstChange) {
      const todo = this._td.getTodo(changes.editIndex.currentValue);
      this.todoCreateForm.patchValue(todo);
    }
  }

  add() {
    console.log('New todo data: ', this.todoCreateForm.value);
    if (this.todoCreateForm.value.id) {
      this._td.put(this.todoCreateForm.value);
    }else {
      this._td.create(this.todoCreateForm.value);
    }
    this.todoCreateForm.reset();
  }

  search() {
    console.log('search term:', this.searchForm.value);
    this._td.doSearch(this.searchForm.controls['term'].value);
  }

}
