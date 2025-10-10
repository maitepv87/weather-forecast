import { ACTION_TYPES } from "../actionTypes";

// successType:  ACTION_TYPES.FETCH_WEATHER_SUCCEEDED or  ACTION_TYPES.FETCH_FORECAST_SUCCEEDED

export const fetchWeatherData = async (dispatch, url, successType) => {
  dispatch({ type: ACTION_TYPES.FETCH_STARTED });
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Error fetching data");

    const data = await response.json();
    dispatch({ type: successType, payload: data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.FETCH_FAILED, payload: error.message });
  }
};
