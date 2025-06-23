import { computed, effect, inject, Injectable, InjectionToken, Provider, signal } from '@angular/core';
import { ApiService } from '../api/api.service';

export function getStateProvider<Item extends {
  id: number
}>(stateKey: string, storeToken: InjectionToken<SignalState<Item>>): Provider {
  return {
    provide: storeToken,
    useFactory: () => new SignalState<Item>(stateKey, inject(ApiService)),
  };
}


export class SignalState<Item extends { id: number }> {
  constructor(private readonly stateKey: string, private readonly apiService: ApiService<Item>) {
    effect(() => {
      localStorage.setItem(this.stateKey, JSON.stringify(this.items()));
    });
  }

  private readonly initialLocalStorageValue = JSON.parse(localStorage.getItem(this.stateKey) ?? '[]');
  private readonly state = {
    items: signal<Item[]>(this.initialLocalStorageValue),
    loading: signal(false),
  } as const;

  /** Selectors */
  public readonly items = this.state.items.asReadonly();
  public readonly loading = this.state.loading.asReadonly();

  selectItemById = (id: number) => computed(() => this.state.items().find(item => item.id === id));

  loadItems(url: string): void {
    this.state.loading.set(true);
    this.apiService.getAll<Item>(url).subscribe({
        next: (items) => {
          this.state.items.set(items);
          this.state.loading.set(false);
        },
        error: (err: unknown) => {
          console.error('Error loading items:', err);
          this.state.loading.set(false);
        }
      }
    );
  }

  /** Actions */
  removeItem(id: number): void {
    this.state.items.update(items => items.filter(item => item.id !== id));
  }

  upsertItem(item: Item): void {
    this.state.items.update(items => {
      const index = items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        const updatedItems = [...items];
        updatedItems[index] = item;
        return updatedItems;
      } else {
        return [...items, item];
      }
    });
  }
}
