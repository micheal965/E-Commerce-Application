import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  private subscription = new Subscription();
  cart: Icart = {} as Icart;

  ngOnInit(): void {
    const sub = this._cartService.getProductsCart().subscribe({
      next: (res) => {
        this.cart = res.data;
      }
    })
    this.subscription.add(sub);
  }
  deleteCartItem(id: string): void {
    const sub = this._cartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._toastr.success('Item removed from your cart.');
      },
      error: () => {
        this._toastr.error('Something went wrong while removing the item from your cart.');
      }
    });
    this.subscription.add(sub);
  }
  updateCartItem(id: string, count: number): void {
    if (count > 0) {
      const sub = this._cartService.updateSpecificProduct(id, count).subscribe({
        next: (res) => {
          this.cart = res.data;
          this._toastr.success('Your cart item count has been updated.');
        },
        error: (err) => {
          this._toastr.error(err.message);
        }
      })
      this.subscription.add(sub);
    } else {
      this._toastr.info('You cannot decrease the item count below 1.');
    }
  }
  clearCart(): void {
    const sub = this._cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this._toastr.success('Your cart has been cleared successfully.');
          this.cart = {} as Icart;
        }
      },
      error: () => {
        this._toastr.error('Failed to clear your cart. Please try again.');
      }
    })
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
