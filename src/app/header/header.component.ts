import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  todoCreateForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.todoCreateForm = this._fb.group({
      title: ['', Validators.required]
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

  add() {
    console.log('New todo data: ', this.todoCreateForm.value);
  }

  search() {
    console.log('search term:', this.searchForm.value);
  }

}
