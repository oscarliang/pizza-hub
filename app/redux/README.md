# Redux Implementation for Pizza Hub

This directory contains the Redux implementation for state management in the Pizza Hub application.

## Structure

- `/app/redux/store.ts` - Contains the Redux store configuration with Redux Toolkit and Redux Persist
- `/app/redux/hooks` - Custom Redux hooks for type-safe usage
- `/app/redux/slices` - Redux Toolkit slices for different parts of the application
- `/app/redux/index.ts` - Centralized exports for easier imports

## Slices

1. **Auth Slice** (`/slices/authSlice.ts`)
   - Manages authentication state (login, logout, token management)
   - Handles login errors and loading states

2. **User Slice** (`/slices/userSlice.ts`)
   - Manages user profile information
   - Handles user preferences and settings
   - Manages addresses, payment methods, and favorite orders

3. **Cart Slice** (`/slices/cartSlice.ts`)
   - Manages shopping cart state
   - Handles adding, removing, and updating items
   - Calculates totals, taxes, and delivery fees

## Usage

To use Redux in a component:

```tsx
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { someAction } from '@/app/redux';

function MyComponent() {
  const dispatch = useAppDispatch();
  const someState = useAppSelector(state => state.someSlice.someProperty);

  const handleSomeAction = () => {
    dispatch(someAction(parameters));
  };

  return (
    // JSX that uses someState and handleSomeAction
  );
}
```

## State Persistence

The application uses Redux Persist to persist data between app sessions. The following slices are persisted:

- Auth state
- User profile data
- Cart items

This ensures that users remain logged in, their preferences are saved, and cart items are retained between app sessions. 