import {
  inject,
  fakeAsync,
  tick,
  TestBed,
  async
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
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/next';

import { TodoService } from './todo.service';
import { HeaderComponent } from '../../todo/components/header/header.component';



describe('MockBackend: TodoService', () => {
  let mockbackend, service;
  let search$;
  let searchTerm: any;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TodoService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });
  beforeEach(inject([TodoService, XHRBackend], (_service, _mockbackend) => {
    service = _service;
    mockbackend = _mockbackend;
  }));

  // specs
  it('should return mocked Id response', () => {
    const response = [3, 4];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
    service.getTodo().subscribe(id => {
      expect(id).toContain(3);
      expect(id).toContain(4);
      expect(id.length).toBe(2);
    });
  });

  // specs
  it('performs a POST', async(() => {
    const response = ['id', 'title', 'status'];
    mockbackend.connections.subscribe(c => {
    expect(c.request.url) .toBe('/todo/');
    expect(c.request.method).toBe(RequestMethod.Post);
    c.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(response)
    })));
    });
    service.create().subscribe(res => {
      expect(res).toContain('id');
      expect(res).toContain('title');
      expect(res).toContain('status');
    });
  }));

  // specs
  it('performs a DELETE', async(() => {
    const response = ['id', 'createdAt', 'title', 'status'];
    let id: number;
    mockbackend.connections.subscribe(c => {
      expect(c.request.url)
      .toBe(`/todo/${id}`);
      console.log(c.request.url);
      expect(c.request.method).toBe(RequestMethod.Delete);
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
    service.delete().subscribe(res => {
      expect(res).toContain('id');
      expect(res).toContain('createdAt');
      expect(res).toContain('title');
      expect(res).toContain('status');
    });
  }));

  beforeEach(() => {
    search$ = new Observable(observer => {
      observer.next('task1');
      observer.next('task2');
    });
  });

  // spec
  it('should create the expected search sequence', async(() => {
    let expected = ['task1', 'task2'],
    index = 0;
    search$
      .subscribe({
        next: x => expect(x).toEqual(expected[index++]),
        error: e => console.log(e)
      });
  }));
});






