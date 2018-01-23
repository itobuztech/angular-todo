// import {
//   TestBed,
//   async,
//   fakeAsync,
//   tick,
//   inject
// } from '@angular/core/testing';
// import { Component, NgModule, DebugElement } from '@angular/core';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { RouterTestingModule } from '@angular/router/testing';
// import { RouterModule, Router, Routes } from '@angular/router';
// import { APP_BASE_HREF } from '@angular/common';
// import { Location } from '@angular/common';
// import { SpyNgModuleFactoryLoader } from '@angular/router/testing';

// import { TodoModule } from './todo/todo.module';



// @Component({
//   selector: 'todo-root',
//   template: `<router-outlet></router-outlet>`
// })
// class AppComponent { }

// @Component({
//   selector: 'todo-list',
//   template: `<h1>List</h1>`
// })
// export class ListComponent { }

// @Component({
//   selector: 'todo-notfound',
//   template: `<h1>Not found component</h1>`
// })
// export class NotfoundComponent { }


// export const routes: Routes = [
//   { path: 'todos', loadChildren: 'app/todo/todo.module#TodoModule' },
//   { path: '',
//     redirectTo: '/todos/list',
//     pathMatch: 'full'
//   },
//   { path: '**', component: NotfoundComponent }
// ];

// @NgModule({
//   imports: [
//     BrowserModule, RouterModule.forRoot(routes),
//   ],
//   declarations: [AppComponent, ListComponent, NotfoundComponent],
//   bootstrap: [AppComponent],
//   exports: [AppComponent],
//   providers: [
//     { provide: APP_BASE_HREF, useValue: '/' }
//   ]
// })
// export class AppModule { }


// describe('Router tests', () => {
//   let router;
//   // let el: DebugElement;
//   // setup
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AppModule
//       ]
//     });
//   });
//   beforeEach(inject([Router], _router => {
//     router = _router;
//   }));

//   it('default route redirects to /todos/list', async(() => {
//     let fixture = TestBed.createComponent(AppComponent);
//     TestBed.get(Router)
//       .navigate([''])
//         .then(() => {
//           expect(location.pathname.endsWith('/todos/list')).toBe(true);
//         }).catch(e => console.log(e));
//   }));

//   it('should redirect unexisting urls to Not Found Component', async(() => {
//     let fixture = TestBed.createComponent(NotfoundComponent);
//     let notText = element(By.css('.jumbotron'));
//     TestBed.get(Router)
//       .navigate(['/undefined'])
//         .then(() => {
//           expect(location.pathname.endsWith('/undefined')).toBe(true);
//           expect(notText.isPresent()).toBeFalsy();
//         }).catch(e => console.log(e));
//   }));

// });


