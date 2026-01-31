import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(data: any[] | null | undefined, term: string): any[] {
    if (!data) return [];
    if (!term) return data;

    return data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase()),
    );
  }
}
