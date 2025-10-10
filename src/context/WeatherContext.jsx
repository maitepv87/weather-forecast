/**
 * BookContext + useReducer (Async)
 *
 * Modular React pattern for managing async book state using Context and useReducer.
 * Includes loading, error, and CRUD lifecycle.
 *
 * Usage:
 * 1. Wrap your app with <BookProvider> in index.jsx
 * 2. Use `useBookContext()` inside components to access state and dispatch
 * 3. Call `fetchBooks(dispatch)` to trigger async fetch
 */

import { createContext } from "react";

export const WeatherContext = createContext();
