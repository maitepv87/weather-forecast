import { useReducer } from "react";
import { WeatherContext } from "./WeatherContext";
import { weatherReducer, initialState } from "./weatherReducer";

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
