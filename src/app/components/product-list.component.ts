import { ChangeDetectionStrategy, Component, EventEmitter, input, output, Output } from '@angular/core';
import { Product } from '../model/product';
import { ProductItemComponent } from './product-item.component';

@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (product of products(); track product.id) {
          <app-product-item
            [product]="product"
            (addToCart)="addToCart.emit($event)"
          />
      }
    </div>
  `,
  imports: [
    ProductItemComponent
  ]
})
export class ProductListComponent {
  readonly products = input<Product[]>([]);
  readonly loading = input<boolean>(false);

  readonly addToCart = output<Product>();
}
