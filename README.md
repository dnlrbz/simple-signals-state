# Simple Signals State

A lightweight, reusable signal-based store for managing lists of items in Angular. No NGRX, no actions, reducers, or effects—just simple, reactive state management using Angular signals.

## Features

- 🚀 \*\*No NGRX Required\*\*: No need to learn or configure NGRX.
- 🧩 \*\*Reusable\*\*: Use at the component or root level.
- ⚡ \*\*Reactive\*\*: Powered by Angular signals for instant UI updates.
- 🗂️ \*\*List Management\*\*: Easily load, upsert, and remove items.
- 🛠️ \*\*No Boilerplate\*\*: No actions, reducers, or effects to write.
- 💾 \*\*Persistence\*\*: State is automatically synced with \`localStorage\`.

## Usage

1. **Install dependencies** (Angular 16+ required):

   ```sh
   npm install
   ```

2. **Provide a store** for your item type:

   ```typescript
   import { getStateProvider } from 'src/app/state/signal-state.service';

   @NgModule({
     providers: [
       getStateProvider('my-items', MY_ITEMS_STORE_TOKEN)
     ]
   })
   export class MyModule {}
   ```

3. **Inject and use in your component**:

   ```typescript
   constructor(@Inject(MY_ITEMS_STORE_TOKEN) public store: SignalState<MyItem>) {}

   // Load items
   this.store.loadItems('/api/items');

   // Upsert or remove items
   this.store.upsertItem(item);
   this.store.removeItem(itemId);
   ```

## Why?

- **Simple**: Focus on your app, not on store boilerplate.
- **Flexible**: Use anywhere, for any list of items.
- **Modern**: Built for Angular signals.

---

No NGRX. No complexity. Just signals.
