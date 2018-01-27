import { SearchPipe } from '../pipes/search.pipe';
import { async, TestBed } from '@angular/core/testing';
import { TODO } from '../interface/todo.interface';



describe('SearchPipe', () => {
  const pipe = new SearchPipe();
  const todoArr: Array<TODO> = [{title: 'taskd1', id: 1, status: true}];
  const shortTitle: any = 't';
  it('returns only if entered character matched with title', () => {
    expect(pipe.transform(todoArr, shortTitle)).toEqual(todoArr);
  });
});
