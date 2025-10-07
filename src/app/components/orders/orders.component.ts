import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _ordersService = inject(OrdersService);
  private readonly _router = inject(Router);
  private readonly _toastr = inject(ToastrService);

  subscriptions: Subscription = new Subscription();
  cartId!: string | null;
  isLoading: boolean = false;
  orderForm: FormGroup = this._formBuilder.group({
    details: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null]
  });

  ngOnInit(): void {
    const sub = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      }
    });
    this.subscriptions.add(sub);
  }
  checkOutSubmit(): void {
    this.isLoading = true;
    const sub = this._ordersService.checkout(this.cartId, this.orderForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
      error: () => {
        this._toastr.error('There are no items in your cart to checkout.');
        this._router.navigate(['/cart']);
      }
    });
    this.subscriptions.add(sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
