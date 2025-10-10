import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, FormsModule, SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _categoryService = inject(CategoriesService);

  private subscriptions = new Subscription();
  categoriesList: WritableSignal<ICategory[]> = signal([]);

  ngOnInit(): void {
    const getAllCategoriesSub = this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList.set(res.data);
      }
    });
    this.subscriptions.add(getAllCategoriesSub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
