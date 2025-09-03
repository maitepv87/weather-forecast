import "./HomePage.css";
import { useContext, useEffect, useState } from "react";
import { AsyncContext } from "../context/AsyncContext";
import { fetchAsyncData } from "../context/actions/fetchAsyncData";
import { ASYNC_ACTIONS } from "../context/asyncActions";
import { forecastGroupByDay } from "../utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { state, dispatch } = useContext(AsyncContext);

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
        ASYNC_ACTIONS.FETCH_WEATHER_SUCCEEDED
      );
      fetchAsyncData(
        dispatch,
        forecastUrl,
        ASYNC_ACTIONS.FETCH_FORECAST_SUCCEEDED
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
    <div className="homeWrapper">
      <header className="header">
        <div className="headerContent">
          <h1 className="title">Weather Forecast</h1>
          <div className="logo">🌤️</div>
        </div>
      </header>

      <main className="main">
        <div className="searchBox">
          <input
            type="search"
            id="searchTerm"
            name="searchTerm"
            placeholder="Enter city name"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>

        {state?.weatherData?.main && (
          <section className="weatherSection">
            <div className="card">
              <div className="cardHeader">
                <h2>Current Weather</h2>
                <h2>°C / °F</h2>
              </div>
              <div className="cardContent">
                <div className="leftContent">
                  <p className="cityName">{state.weatherData.name}</p>

                  <div className="mainWeatherBlock">
                    <img
                      src={`https://openweathermap.org/img/wn/${state.weatherData.weather[0].icon}@2x.png`}
                      alt={state.weatherData.weather[0].description}
                      className="weatherIconInline"
                    />
                    <p className="temperatureInline">
                      {Math.round(state.weatherData.main.temp)}°C
                    </p>
                  </div>
                  <p className="condition">
                    {state.weatherData.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      state.weatherData.weather[0].description.slice(1)}
                  </p>
                </div>

                <div className="rightContent">
                  <p>Feels like: {state.weatherData.main.feels_like}°C</p>
                  <p>Max: {state.weatherData.main.temp_max}°C</p>
                  <p>Min: {state.weatherData.main.temp_min}°C</p>
                  <p>Humidity: {state.weatherData.main.humidity} %</p>
                  <p>Wind: {state.weatherData.wind.speed} kph</p>
                  <p>Pressure: {state.weatherData.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {sevenDayForecast.length > 0 && (
          <section className="forecastSection">
            <div className="card">
              <div className="cardHeader">
                <h2>Weekly Forecast</h2>
              </div>
              <div className="cardContent">
                {sevenDayForecast.map((day, index) => (
                  <div className="forecastCard" key={index}>
                    <p>{day.day}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.condition}
                    />
                    <p>{day.condition}</p>
                    <p>
                      {Math.round(day.temp_max)}° / {Math.round(day.temp_min)}°
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <small>
          Developed in Visual Studio Code by yours truly. Built with React.
        </small>
      </footer>
    </div>
  );
};
