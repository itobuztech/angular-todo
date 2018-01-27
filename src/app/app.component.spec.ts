import {
  TestBed,
  async,
  fakeAsync,
  tick,
  inject
} from '@angular/core/testing';
import { Component, NgModule, DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Location } from '@angular/common';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';

import { TodoModule } from './todo/todo.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ListComponent } from './todo/components/list/list.component';

describe('Router tests', () => {
  let router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });
  beforeEach(inject([Router], _router => {
    router = _router;
  }));

  it('default route redirects to /todos/list', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    TestBed.get(Router)
      .navigate([''])
        .then(() => {
          let mainText = fixture.debugElement.query(By.css('h1')).nativeElement;
          expect(location.pathname.endsWith('/todos/list')).toBe(true);
          console.log(`mainText: ${mainText.innerText}`);
          expect(mainText.innerText).toEqual('Angular Todo App');
        }).catch(e => console.log(e));
  }));

  it('should redirect unexisting urls to Not Found Component', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    TestBed.get(Router)
      .navigate(['/undefined'])
        .then(() => {
          let notText = fixture.debugElement.query(By.css('h1'));
          let h1 = notText.nativeElement;
          expect(location.pathname.endsWith('/undefined')).toBe(true);
          console.log('hello', h1.innerText);
          expect(h1.innerText).toEqual('Not Found');
        }).catch(e => console.log('ll', e));
  }));

});
