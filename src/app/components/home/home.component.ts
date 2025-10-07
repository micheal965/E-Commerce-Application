import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from "@angular/router";
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy {
  private readonly _categoryService = inject(CategoriesService);
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  private subscriptions = new Subscription();
  productsList: IProduct[] = [];
  categoriesList: ICategory[] = [];
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
    navText: ['', ''],
    items: 1,
    nav: false
  }
  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-left-long"></i>', '<i class="fa-solid fa-right-long"></i>'],
    responsive: {
      0: {
        items: 1   // mobile
      },
      576: {
        items: 2   // sm
      },
      768: {
        items: 3   // md
      },
      992: {
        items: 4   // lg
      },
      1200: {
        items: 5   // xl
      },
      1400: {
        items: 6   // xxl
      }
    },
    nav: true
  }
  ngOnInit(): void {
    //Categories
    const getAllCategoriesSub = this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.add(getAllCategoriesSub);
    //Products
    const getAllProductsSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data.slice(0, 12);
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.subscriptions.add(getAllProductsSub);
  }

  addToCart(id: string): void {
    const sub = this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._toastr.success(res.message);
      },
      error: (err) => {
        this._toastr.error(err.message);
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
