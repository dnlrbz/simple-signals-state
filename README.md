# Simple Signals State

A lightweight, reusable signal-based store implementation with less than 50 lines of code for managing lists of items in Angular. 
No NGRX, no actions, reducers, or effects—just simple, reactive state management using Angular signals.

## Features

- 🚀 **No NGRX Required**: No need to learn or configure NGRX.
- 🧩 **Reusable**: Use at the component or root level.
- ⚡ **Reactive**: Powered by Angular signals for instant UI updates.
- 🗂️ **List Management**: Easily load, upsert, and remove items.
- 🛠️ **No Boilerplate**: No actions, reducers, or effects to write.
- 💾 **Persistence**: State is automatically synced with `localStorage`.

## Usage


   ```typescript
   @Component({
     selector: 'my-items',
     providers: [
       getStateProvider<Item>('my-items', MY_ITEMS_STORE_TOKEN)
     ],
     template: `
       <button (click)="store.loadItems('/api/items')">Load</button>
       <ul>
         @for (item of store.items(); track item.id) {
           <li>{{ item.name }}</li>
         }
       </ul>
     `
   })
   export class MyItemsComponent {
     readonly store = inject(MY_ITEMS_STORE_TOKEN);
   }
   ```

## Why?

- **Simple**: Focus on your app, not on store boilerplate.
- **Flexible**: Use anywhere, for any list of items.
- **Modern**: Built for Angular signals.

---

No NGRX. No complexity. Just signals.
