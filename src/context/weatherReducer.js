import { ACTION_TYPES } from "./actionTypes";

// Initial state for async operations: loading, error, and data
export const initialState = {
  loading: false,
  error: null,
  weatherData: null,
  forecastData: null,
  unit: "metric",
};

// Reducer to handle async lifecycle: start, success, error, reset
export const weatherReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_STARTED:
      return { ...state, loading: true, error: null };
    case ACTION_TYPES.FETCH_WEATHER_SUCCEEDED:
      return { ...state, loading: false, weatherData: action.payload };
    case ACTION_TYPES.FETCH_FORECAST_SUCCEEDED:
      return { ...state, loading: false, forecastData: action.payload };
    case ACTION_TYPES.FETCH_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ACTION_TYPES.RESET_STATE:
      return initialState;
    case ACTION_TYPES.TOGGLE_UNIT:
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };
    default:
      return state;
  }
};
