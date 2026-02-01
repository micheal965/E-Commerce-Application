import { Component, effect, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cart = this.cartService.cart;

  ngOnInit(): void {
    this.cartService.getProductsCart().subscribe();
  }

  deleteItem(id: string) {
    this.cartService.deleteSpecificCartItem(id).subscribe();
  }

  updateItem(id: string, count: number) {
    if (count < 1) return;
    this.cartService.updateSpecificProduct(id, count).subscribe();
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }
}
