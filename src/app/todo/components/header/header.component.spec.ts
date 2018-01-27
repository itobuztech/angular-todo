import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  inject,
  fakeAsync,
  tick,
  TestBed,
  getTestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import {
  Http,
  HttpModule,
  XHRBackend,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TodoService } from '../../services/todo.service';
import { HeaderComponent } from './header.component';
import { window } from 'rxjs/operator/window';
import { dispatchEvent } from '@angular/core/src/view/util';
import { element, by } from 'protractor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';


describe('Test create and search forms', () => {
  let comp: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el, input, form;
  let mockTodoService;
  let window: any;
  let finalMsg = [];
  let inputVal$;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ HeaderComponent ],
      providers: [
        TodoService,
        { provide: HttpClient, deps: [MockBackend] },
      ]
    })
    .compileComponents();

    TestBed.overrideComponent(HeaderComponent, {
      set: {
        providers: [
          { provide: TodoService, useValue: mockTodoService }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
  }));

  // spec
  it('validates and triggers events', fakeAsync(() => {
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    let msgs = el.querySelector('.asd');
    expect(msgs.innerHTML).toContain(`Field can't be blank`);
    console.log(msgs);
    input.value = 'ABC';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    msgs = el.querySelector('.asd');
    console.log(msgs);
    expect(msgs).toBe(null);
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    tick();
    console.log('You submitted value: ABC');
  }));
  // it('checks for autosearch getting data when when page loads', fakeAsync((todoService: TodoService) => {
  //   spyOn(todoService, 'doSearch');
  //   fixture.detectChanges();
    
  // }));
  // beforeEach(() => {
  //   inputVal$ = new Observable(observer => {
  //     observer.next('task1');
  //     observer.next('task2');
  //   });
  // });

  // // spec
  // it('checks for autosearch getting data when when page loads', fakeAsync(() => {
  //   fixture.detectChanges();
  //   input.value = ['task1', 'task2'];
  //   let index = 0;
  //   inputVal$
  //     .subscribe({
  //       next: x => expect(x).toEqual(input.value[index++]),
  //       error: e => console.log(e)
  //     });
  // }));
});

