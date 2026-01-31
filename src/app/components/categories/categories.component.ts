import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private readonly _categoryService = inject(CategoriesService);
  categoriesList = toSignal<ICategory[]>(
    this._categoryService.getAllCategories().pipe(map((res) => res.data)),
    { initialValue: null },
  );
}
