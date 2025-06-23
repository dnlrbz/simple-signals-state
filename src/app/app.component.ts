import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';

import { ProductListComponent } from './components/product-list.component';
import { CartComponent } from './components/cart.component';
import { Product } from './model/product';
import { getStateProvider } from './state/signal-state.service';
import { CartItem } from './model/cart-item';
import { CART_STATE, PRODUCT_STATE } from './state/state';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, CartComponent],
  providers: [
    getStateProvider<CartItem>('cart', CART_STATE),
    getStateProvider<Product>('products', PRODUCT_STATE)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-gray-200 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Online Shop</h1>
      <div class="relative">
        <button
          class="bg-white text-blue-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-100 cursor-pointer"
          (click)="isCartOpen.set(!isCartOpen())"
        >
          🛒
        </button>
        @if (isCartOpen()) {
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-transparent z-40"
            (click)="isCartOpen.set(false)"
          ></div>
          <!-- Cart -->
          <div class="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <app-cart [items]="cartItems()"
                      (incrementItem)="incrementItem($event)"
                      (decrementItem)="decrementItem($event)"/>
          </div>
        }
      </div>
    </header>
    <main class="p-4">
      @if (productsLoading()) {
        <div class="flex justify-center items-center w-full">
          <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      } @else {
        <app-product-list [products]="products()" [loading]="productsLoading()" (addToCart)="addToCart($event)"/>
      }
    </main>
  `,
})
export class AppComponent {
  private readonly cartState = inject(CART_STATE);
  private readonly productsState = inject(PRODUCT_STATE);

  readonly isCartOpen = signal(false);
  readonly products: Signal<Product[]> = this.productsState.items;
  readonly productsLoading: Signal<boolean> = this.productsState.loading;
  readonly cartItems: Signal<CartItem[]> = this.cartState.items;

  constructor() {
    this.productsState.loadItems('/products.json');
  }

  addToCart(product: Product) {
    const cartItem = this.cartState.selectItemById(product.id)();
    this.cartState.upsertItem({...product, count: cartItem ? cartItem.count + 1 : 1});
  }

  incrementItem(item: CartItem) {
    this.cartState.upsertItem({...item, count: item.count + 1});
  }

  decrementItem(item: CartItem) {
    if (item.count > 1) {
      this.cartState.upsertItem({...item, count: item.count - 1});
    } else {
      this.cartState.removeItem(item.id);
    }
  }
}
