import { ASYNC_ACTIONS } from "../asyncActions";

export const fetchAsyncData = async (dispatch, url, successType) => {
  dispatch({ type: ASYNC_ACTIONS.FETCH_STARTED });
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    dispatch({ type: successType, payload: data });
  } catch (error) {
    dispatch({ type: ASYNC_ACTIONS.FETCH_FAILED, payload: error.message });
  }
};
