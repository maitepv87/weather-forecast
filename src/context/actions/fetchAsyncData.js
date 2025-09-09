import { ACTION_TYPES } from "../actionTypes";

export const fetchAsyncData = async (dispatch, url, successType) => {
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
