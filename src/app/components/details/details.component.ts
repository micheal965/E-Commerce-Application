import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
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
    },
    nav: false,
  };

  product = toSignal(
    this._activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id): id is string => !!id),
      switchMap((id) => this._productsService.getSpecificProduct(id)),
      map((res) => res.data),
    ),
    { initialValue: null },
  );

  addToCart(id: string): void {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => this._toastr.success(res.message),
      error: (err) => this._toastr.error(err.message),
    });
  }
}
