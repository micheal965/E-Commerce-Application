import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  private subscriptions = new Subscription();
  productsList: WritableSignal<IProduct[]> = signal([]);
  searchWord: string = '';

  ngOnInit(): void {
    const getAllProductsSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      }
    })
    this.subscriptions.add(getAllProductsSub);
  }

  addToCart(id: string): void {
    const sub = this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._toastr.success(res.message);
        this._cartService.cartNumber.set(res.numOfCartItems);
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
