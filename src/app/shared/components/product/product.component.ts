import {
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  product = input.required<IProduct>();

  addToCart(id: string): void {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => this._toastr.success(res.message),
      error: (err) => this._toastr.error(err.message),
    });
  }
}
