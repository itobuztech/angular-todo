import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '../share/share.module';
import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';

import { TodoService } from './services/todo.service';
import { SearchPipe } from './pipes/search.pipe';

const todoRoutes: Routes = [
  { path: '', component: TodoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(
      todoRoutes
    )
  ],
  declarations: [
    TodoComponent,
    HeaderComponent,
    ListComponent,
    SearchPipe
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
