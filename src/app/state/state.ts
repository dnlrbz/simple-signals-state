import { InjectionToken } from '@angular/core';
import { SignalState } from './signal-state.service';
import { CartItem } from '../model/cart-item';
import { Product } from "../model/product";

export const CART_STATE = new InjectionToken<SignalState<CartItem>>('cart')
export const PRODUCT_STATE = new InjectionToken<SignalState<Product>>('products')

export const STATE_KEY = new InjectionToken<string>('state-key');
