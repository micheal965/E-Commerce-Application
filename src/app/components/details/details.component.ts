import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProductdetails } from '../../core/interfaces/iproductdetails';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  private activatedRouteSub!: Subscription;
  private productServiceSub!: Subscription;

  product: IProductdetails | null = null;

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
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.activatedRouteSub = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        let id: string | null = params.get('id');
        //Calling api
        this.productServiceSub = this._productsService.getSpecificProduct(id).subscribe({
          next: (res) => {
            this.product = res.data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
  }
  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe();
    this.productServiceSub.unsubscribe();
  }
}
