import { useReducer } from "react";
import { ASYNC_ACTIONS } from "./asyncActions";

// Initial state for async operations: loading, error, and data
const initialState = {
  loading: false,
  error: null,
  weatherData: null,
  forecastData: null,
  unit: "metric",
};

// Reducer to handle async lifecycle: start, success, error, reset
const reducer = (state, action) => {
  switch (action.type) {
    case ASYNC_ACTIONS.FETCH_STARTED:
      return { ...state, loading: true, error: null };
    case ASYNC_ACTIONS.FETCH_WEATHER_SUCCEEDED:
      return { ...state, loading: false, weatherData: action.payload };
    case ASYNC_ACTIONS.FETCH_FORECAST_SUCCEEDED:
      return { ...state, loading: false, forecastData: action.payload };
    case ASYNC_ACTIONS.FETCH_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ASYNC_ACTIONS.RESET_STATE:
      return initialState;
    case ASYNC_ACTIONS.TOGGLE_UNIT:
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };
    default:
      return state;
  }
};

// Custom hook to manage async state transitions
export const useAsyncReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};
