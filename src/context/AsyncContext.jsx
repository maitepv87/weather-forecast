import { createContext, useContext } from "react";
import { useAsyncReducer } from "./useAsyncReducer";

// Create the context
export const AsyncContext = createContext();

// Provider that wraps the app
export const AsyncProvider = ({ children }) => {
  const { state, dispatch } = useAsyncReducer();
  return (
    <AsyncContext.Provider value={{ state, dispatch }}>
      {children}
    </AsyncContext.Provider>
  );
};

// Hook to consume the context
export const useAsyncContext = () => {
  const context = useContext(AsyncContext);
  if (!context) {
    throw new Error("useAsyncContext must be used within an AsyncProvider");
  }
  return context;
};
