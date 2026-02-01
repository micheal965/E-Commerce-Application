import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
})
export class AllordersComponent {
  private readonly orderService = inject(OrdersService);
  orders = toSignal(this.orderService.getUserOrders(), { initialValue: [] });
}
