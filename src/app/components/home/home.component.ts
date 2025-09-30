import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  private readonly _productService = inject(ProductsService);
  productsList: IProduct[] = [];

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data.slice(0, 12);
      },
      error: (err) => {
        console.error(err);
      }
    })

  }
}
