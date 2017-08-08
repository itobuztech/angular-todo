import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import { ShareModule } from '../share/share.module';
import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './details/details.component';
import { SearchPipe } from './pipes/search.pipe';
import { TodoService } from './services/todo.service';
import { httpFactory } from './services/todo.interceptor';

const todoRoutes: Routes = [
  {
    path: '', component: TodoComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: ':id', component: DetailsComponent },
      { path: '', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(
      todoRoutes
    ),
    HttpModule
  ],
  declarations: [
    TodoComponent,
    HeaderComponent,
    ListComponent,
    SearchPipe,
    DetailsComponent
  ],
  providers: [
    TodoService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class TodoModule { }
