import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit, OnDestroy {
  private readonly _myTranslateService = inject(MyTranslateService);
  private readonly _cartService = inject(CartService);
  readonly _authService = inject(AuthService);
  readonly _translateService = inject(TranslateService);

  cartNumber: Signal<number> = computed(() => this._cartService.cartNumber());
  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const sub = this._cartService.getProductsCart().subscribe({
      next: (res) => {
        this._cartService.cartNumber.set(res.numOfCartItems);
      }
    });
    this.subscriptions.add(sub);
  }
  change(lang: string): void {
    this._myTranslateService.changeLang(lang);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
