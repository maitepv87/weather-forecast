import styles from "./ForecastCard.module.css";
import { useContext } from "react";
import { AsyncContext } from "../../context/AsyncContext";
import { forecastGroupByDay } from "../../utils";
import { toFahrenheit } from "../../utils/unitConversions";

export const ForecastCard = () => {
  const { state } = useContext(AsyncContext);

  const sevenDayForecast =
    Array.isArray(state.forecastData?.list) &&
    state.forecastData.list.length > 0
      ? forecastGroupByDay(state.forecastData.list)
      : [];

  const formatTemp = (tempC) => {
    if (state.unit === "metric") {
      return `${Math.round(tempC)}°C`;
    }
    return `${Math.round(toFahrenheit(tempC))}°F`;
  };

  return (
    <section className={styles.forecastSection}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Weekly Forecast</h2>
        </div>
        <div className={styles.cardContent}>
          {sevenDayForecast.map((day, index) => (
            <div className={styles.forecastCard} key={index}>
              <p>{day.day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.condition}
              />
              <p>{day.condition}</p>
              <p>
                {formatTemp(day.temp_max)} / {formatTemp(day.temp_min)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
