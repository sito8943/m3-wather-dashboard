import { fetchWeatherApi } from "openmeteo";

export type HourlyWeather = {
  time: Date[];
  temperature_2m: number[] | Float32Array;
};

export type ForecastMeta = {
  latitude: number;
  longitude: number;
  elevation: number;
  utcOffsetSeconds: number;
};

export type ForecastResult = {
  meta: ForecastMeta;
  hourly: HourlyWeather;
};

export type ForecastParams = {
  latitude: number;
  longitude: number;
  /**
   * Only temperature is mapped below. Keep as "temperature_2m" unless
   * you extend the mapping of variables.
   */
  hourly?: "temperature_2m";
  url?: string;
};

/**
 * Fetches hourly temperature data from Open‑Meteo and maps it into simple arrays.
 * Safe to call from React components (e.g., inside useEffect) or loaders.
 */
export async function fetchHourlyTemperature(
  params: ForecastParams
): Promise<ForecastResult> {
  const { latitude, longitude, url = "https://api.open-meteo.com/v1/forecast" } =
    params;

  const query = {
    latitude,
    longitude,
    hourly: "temperature_2m" as const,
  };

  const responses = await fetchWeatherApi(url, query);
  const response = responses[0];

  const meta: ForecastMeta = {
    latitude: response.latitude(),
    longitude: response.longitude(),
    elevation: response.elevation(),
    utcOffsetSeconds: response.utcOffsetSeconds(),
  };

  const hourly = response.hourly();
  if (!hourly) {
    throw new Error("Hourly data is missing in Open‑Meteo response");
  }

  const interval = hourly.interval();
  const start = Number(hourly.time());
  const end = Number(hourly.timeEnd());
  const steps = (end - start) / interval;

  const time: Date[] = [...Array(steps)].map((_, i) =>
    new Date((start + i * interval + meta.utcOffsetSeconds) * 1000)
  );

  const temperature_2m = hourly.variables(0)!.valuesArray() ?? [];

  return {
    meta,
    hourly: { time, temperature_2m },
  };
}

export default fetchHourlyTemperature;
