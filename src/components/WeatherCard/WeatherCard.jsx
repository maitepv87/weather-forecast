import styles from "./WeatherCard.module.css";
import { useContext } from "react";
import { AsyncContext } from "../../context/AsyncContext";
import { ASYNC_ACTIONS } from "../../context/asyncActions";
import { UnitToggle } from "../";
import { toFahrenheit, toMph } from "../../utils/unitConversions";

export const WeatherCard = () => {
  const { state, dispatch } = useContext(AsyncContext);

  const handleToggle = () => {
    dispatch({ type: ASYNC_ACTIONS.TOGGLE_UNIT });
  };

  const temp =
    state.unit === "metric"
      ? `${Math.round(state.weatherData.main.temp)}°C`
      : `${Math.round(toFahrenheit(state.weatherData.main.temp))}°F`;

  const feelsLike =
    state.unit === "metric"
      ? `${Math.round(state.weatherData.main.feels_like)}°C`
      : `${Math.round(toFahrenheit(state.weatherData.main.feels_like))}°F`;

  const maxTemp =
    state.unit === "metric"
      ? `${Math.round(state.weatherData.main.temp_max)}°C`
      : `${Math.round(toFahrenheit(state.weatherData.main.temp_max))}°F`;

  const minTemp =
    state.unit === "metric"
      ? `${Math.round(state.weatherData.main.temp_min)}°C`
      : `${Math.round(toFahrenheit(state.weatherData.main.temp_min))}°F`;

  const wind =
    state.unit === "metric"
      ? `${state.weatherData.wind.speed} m/s`
      : `${toMph(state.weatherData.wind.speed).toFixed(1)} mph`;

  return (
    <section className={styles.weatherSection}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Current Weather</h2>
          <UnitToggle unit={state.unit} onToggle={handleToggle} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.leftContent}>
            <p className={styles.cityName}>{state.weatherData.name}</p>

            <div className={styles.mainWeatherBlock}>
              <img
                src={`https://openweathermap.org/img/wn/${state.weatherData.weather[0].icon}@2x.png`}
                alt={state.weatherData.weather[0].description}
                className={styles.weatherIconInline}
              />
              <p className={styles.temperatureInline}>{temp}</p>
            </div>
            <p className={styles.condition}>
              {state.weatherData.weather[0].description
                .charAt(0)
                .toUpperCase() +
                state.weatherData.weather[0].description.slice(1)}
            </p>
          </div>

          <div className={styles.rightContent}>
            <p>Feels like: {feelsLike}</p>
            <p>Max: {maxTemp}</p>
            <p>Min: {minTemp}</p>
            <p>Humidity: {state.weatherData.main.humidity} %</p>
            <p>Wind: {wind}</p>
            <p>Pressure: {state.weatherData.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </section>
  );
};
