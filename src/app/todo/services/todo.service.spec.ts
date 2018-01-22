import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
  Http,
  HttpModule,
  XHRBackend,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { TodoService } from './todo.service';


describe('MockBackend: TodoService', () => {
  let mockbackend, service;

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

  //specs
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
  // it('should return mocked create response', () => {
  //   let response = null;
  //   mockbackend.connections.subscribe(connection => {
  //     connection.mockRespond(new Response(new ResponseOptions({
  //       body: JSON.stringify(response)
  //     })));
  //   });
  //   service.create().subscribe(val => {
  //     response = val;
  //   });
  //   expect(response).toBeDefined();
  // });
});





