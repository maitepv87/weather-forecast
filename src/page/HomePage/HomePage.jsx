import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { useAsyncContext } from "../../context/AsyncContext";
import { fetchAsyncData } from "../../context/actions/fetchAsyncData";
import { ACTION_TYPES } from "../../context/actionTypes";
import { forecastGroupByDay } from "../../utils";
import {
  LoadingSpinner,
  ErrorMessage,
  Header,
  WeatherCard,
  ForecastCard,
  Footer,
  SearchBox,
} from "../../components";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { state, dispatch } = useAsyncContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm !== "") {
      const weatherUrl = `${BASE_URL}weather?q=${debouncedTerm}&units=metric&appid=${API_KEY}`;
      const forecastUrl = `${BASE_URL}forecast?q=${debouncedTerm}&units=metric&appid=${API_KEY}`;

      fetchAsyncData(
        dispatch,
        weatherUrl,
        ACTION_TYPES.FETCH_WEATHER_SUCCEEDED
      );
      fetchAsyncData(
        dispatch,
        forecastUrl,
        ACTION_TYPES.FETCH_FORECAST_SUCCEEDED
      );
    }
  }, [debouncedTerm, dispatch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sevenDayForecast =
    Array.isArray(state.forecastData?.list) &&
    state.forecastData.list.length > 0
      ? forecastGroupByDay(state.forecastData.list)
      : [];

  return (
    <div className={styles.homeWrapper}>
      <Header />
      <main className={styles.main}>
        {state.loading && <LoadingSpinner />}
        {state.error && (
          <ErrorMessage
            message={
              state.error ||
              "We couldn’t get the weather information right now. Please try again later."
            }
            onRetry={() => setDebouncedTerm(searchTerm.trim())}
          />
        )}
        {!state.loading && !state.error && (
          <>
            <SearchBox value={searchTerm} onChange={handleChange} />
            {state?.weatherData?.main && <WeatherCard />}
            {sevenDayForecast.length > 0 && <ForecastCard />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
