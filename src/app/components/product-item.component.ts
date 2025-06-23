import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border rounded-lg p-4 shadow-md">
      <img [src]="product().imageUrl" alt="{{ product().name }}" class="w-32 h-32 object-cover rounded-md mx-auto"/>
      <h2 class="text-lg font-bold mt-2 text-center">{{ product().name }}</h2>
      <p class="text-gray-600 text-center">$ {{ product().price }}</p>
      <button
        class="bg-blue-400 px-4 py-2 rounded mt-2 w-full cursor-pointer hover:bg-blue-600"
        (click)="addToCart.emit(product())"
      >
        Add to Cart
      </button>
    </div>
  `,
})
export class ProductItemComponent {
  readonly product = input.required<Product>();

  readonly addToCart = output<Product>();
}
