import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  private readonly _categoryService = inject(CategoriesService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  subscriptions: Subscription = new Subscription();
  category!: ICategory;

  ngOnInit(): void {
    const routeSub = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        let categoryId: string = params.get('id')!;
        const catSub = this._categoryService.getSpecificCategory(categoryId).subscribe({
          next: (res) => {
            this.category = res.data;
          }
        })
        this.subscriptions.add(catSub);
      }
    })
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}