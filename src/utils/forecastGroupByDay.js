export const forecastGroupByDay = (list) => {
  const daysMap = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US", { weekday: "short" });

    if (!daysMap[dayKey]) {
      daysMap[dayKey] = {
        day: dayKey,
        icon: item.weather[0].icon,
        condition: item.weather[0].main,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
      };
    } else {
      daysMap[dayKey].temp_min = Math.min(
        daysMap[dayKey].temp_min,
        item.main.temp_min
      );
      daysMap[dayKey].temp_max = Math.max(
        daysMap[dayKey].temp_max,
        item.main.temp_max
      );
    }
  });

  return Object.values(daysMap).slice(0, 7);
};
