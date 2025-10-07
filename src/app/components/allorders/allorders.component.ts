import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { Iorder } from '../../core/interfaces/iorder';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})

export class AllordersComponent implements OnInit, OnDestroy {
  private readonly _orderService = inject(OrdersService);

  subscriptions: Subscription = new Subscription();
  orders: Iorder[] = [];
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;
      const sub = this._orderService.getUserOrders(userId).subscribe({
        next: (res) => {
          this.orders = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
      this.subscriptions.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
