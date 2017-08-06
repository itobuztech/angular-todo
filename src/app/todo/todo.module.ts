import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '../share/share.module';
import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './details/details.component';
import { SearchPipe } from './pipes/search.pipe';
import { TodoService } from './services/todo.service';

const todoRoutes: Routes = [
  { path: '', component: TodoComponent ,
  children: [
    {path: 'list', component: ListComponent},
    {path: ':id', component: DetailsComponent}
  ]
}
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
    SearchPipe,
    DetailsComponent
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
