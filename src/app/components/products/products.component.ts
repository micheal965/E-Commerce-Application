import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductsService } from '../../core/services/products.service';
import { ProductComponent } from '../../shared/components/product/product.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, FormsModule, ProductComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly _productService = inject(ProductsService);
  productsList = toSignal(this._productService.getAllProducts(), {
    initialValue: [],
  });
  searchWord: string = '';
}
