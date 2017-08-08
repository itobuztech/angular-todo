import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  { path: 'todos', loadChildren: 'app/todo/todo.module#TodoModule' },
  { path: '',
    redirectTo: '/todos/list',
    pathMatch: 'full'
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
