import config from "../config";
import { useLocalStorage } from "../hooks";
import type { WeatherForecastType } from "../lib/types";

function useForecasts() {
  const data = useLocalStorage(config.forecasts, [] as WeatherForecastType[]);

  const addForecast = (forecast: WeatherForecastType) => {
    const exists = data.value.find((item) => item.name === forecast.name);
    if (exists) return;
    data.set([...data.value, forecast]);
  };

  const removeForecast = (name?: string) => {
    if (name) {
      const filtered = data.value.filter((item) => item.name !== name);
      data.set(filtered);
    } else data.set([]);
  };

  return {
    forecasts: data.value,
    removeForecast,
    addForecast,
  };
}

export default useForecasts;
