import styles from "./WeatherCard.module.css";
import { useContext } from "react";
import { AsyncContext } from "../../context/AsyncContext";

export const WeatherCard = () => {
  const { state } = useContext(AsyncContext);

  return (
    <section className={styles.weatherSection}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Current Weather</h2>
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
              <p className={styles.temperatureInline}>
                {Math.round(state.weatherData.main.temp)}°C
              </p>
            </div>
            <p className={styles.condition}>
              {state.weatherData.weather[0].description
                .charAt(0)
                .toUpperCase() +
                state.weatherData.weather[0].description.slice(1)}
            </p>
          </div>

          <div className={styles.rightContent}>
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
  );
};
