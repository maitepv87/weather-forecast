/**
 * AsyncContext + useAsyncReducer
 *
 * Modular React pattern for global async state management using Context and useReducer.
 * Designed for scalable, asynchronous data flows with built-in loading and error handling.
 *
 * @returns {Object} AsyncContext.Provider with { state, dispatch }
 *
 * Why this pattern?
 * - Avoids prop drilling by centralizing state.
 * - Keeps reducer pure and testable.
 * - Separates async logic for clarity and reuse.
 *
 * Usage:
 * 1. Wrap your app with <AsyncProvider> to provide global access to state and dispatch.
 * 2. Use `useContext(AsyncContext)` inside components to consume state and dispatch.
 * 3. Call `fetchAsyncData(dispatch)` to trigger an async request and update state.
 *
 */

import { createContext } from "react";
import { useAsyncReducer } from "./useAsyncReducer";

export const AsyncContext = createContext();

export const AsyncProvider = ({ children }) => {
  const { state, dispatch } = useAsyncReducer();
  return (
    <AsyncContext.Provider value={{ state, dispatch }}>
      {children}
    </AsyncContext.Provider>
  );
};
