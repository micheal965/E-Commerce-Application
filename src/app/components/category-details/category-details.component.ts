import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interfaces/icategory';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent {
  private readonly _categoryService = inject(CategoriesService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  category = toSignal<ICategory>(
    this._activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) => this._categoryService.getSpecificCategory(id)),
      map((res) => res.data),
    ),
    { initialValue: null },
  );
}
