import { OnInit } from '@angular/core';
import {
  inject,
  fakeAsync,
  tick,
  TestBed,
  async
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('getting value for search on page load', () => {
  let fixture = TestBed.createComponent(HeaderComponent);
  fixture.detectChanges();
});
