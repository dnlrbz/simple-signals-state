import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4 border rounded-lg min-w-[600px] shadow-2xl shadow-gray-800">
      <h2 class="text-lg font-bold mb-4">Cart</h2>
      <ul>
        @for (item of items(); track item.id) {
          <li class="flex items-center justify-between gap-10 py-2">
            <div class="flex items-center gap-4">
              <img [src]="item.imageUrl" class="w-12 h-12 object-cover rounded-md mr-4"/>
              <p class="flex-1">{{ item.name }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
                (click)="decrementItem.emit(item)"
              >
                -
              </button>
              <span>{{ item.count }}</span>
              <button
                class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
                (click)="incrementItem.emit(item)"
              >
                +
              </button>
              <p class="min-w-[100px] text-right">$ {{ item.price * item.count }}</p>
            </div>
          </li>
        }
      </ul>
      <p class="font-bold mt-4">
        Total: $ {{ total() }}
      </p>
    </div>
  `,
})
export class CartComponent {
  /** Inputs */
  readonly items = input.required<CartItem[]>();

  /** Signals */
  readonly total = computed(() =>
    this.items().reduce((acc, curr) => acc + curr.count * curr.price, 0)
  );

  /** Outputs */
  readonly incrementItem = output<CartItem>();
  readonly decrementItem = output<CartItem>();
}
