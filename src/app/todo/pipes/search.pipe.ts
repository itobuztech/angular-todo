import { Pipe, PipeTransform } from '@angular/core';
import { TODO } from '../interface/todo.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(todos: Array<TODO>, filter?: any): any {
    if (filter) {

      const todosFilter = todos.filter(todo => {
        const flag = new RegExp(filter, 'gi').test(todo.title);
        return flag;
      });

      console.log(todosFilter);

      return todosFilter;
    }

    return todos;
  }

}
