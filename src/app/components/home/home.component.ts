import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { map } from 'rxjs';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ProductComponent } from '../../shared/components/product/product.component';
import { IProduct } from '../../core/interfaces/iproduct';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, SearchPipe, FormsModule, ProductComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _categoryService = inject(CategoriesService);
  private readonly _productService = inject(ProductsService);
  private readonly document = inject(DOCUMENT);
  dir = signal(this.document.documentElement.dir || 'ltr');
  searchWord: string = '';
  mainCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    rtl: true,
    navText:
      this.dir() == 'ltr'
        ? [
            '<i class="fa-solid fa-right-long"></i>',
            '<i class="fa-solid fa-left-long"></i>',
          ]
        : [
            '<i class="fa-solid fa-left-long"></i>',
            '<i class="fa-solid fa-right-long"></i>',
          ],
    responsive: {
      0: {
        items: 1, // mobile
      },
      576: {
        items: 2, // sm
      },
      768: {
        items: 3, // md
      },
      992: {
        items: 4, // lg
      },
      1200: {
        items: 5, // xl
      },
      1400: {
        items: 6, // xxl
      },
    },
    nav: true,
  };

  productsList = toSignal<IProduct[]>(
    this._productService
      .getAllProducts()
      .pipe(map((res) => res.data.slice(0, 12))),
  );
  categoriesList = toSignal<ICategory[]>(
    this._categoryService.getAllCategories().pipe(map((res) => res.data)),
  );
}
