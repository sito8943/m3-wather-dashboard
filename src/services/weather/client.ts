import { fetchWeatherApi } from "openmeteo";

export type HourlyWeather = {
  time: Date[];
  temperature_2m: number[] | Float32Array;
  weathercode: number[] | Float32Array | Int32Array;
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
   * Comma separated list of hourly variables for Open‑Meteo API.
   * Internally we always fetch at least temperature and weathercode.
   */
  hourly?: string;
  url?: string;
};

/**
 * Fetches hourly temperature data from Open‑Meteo and maps it into simple arrays.
 * Safe to call from React components (e.g., inside useEffect) or loaders.
 */
export async function fetchHourlyTemperature(
  params: ForecastParams
): Promise<ForecastResult> {
  const {
    latitude,
    longitude,
    url = "https://api.open-meteo.com/v1/forecast",
  } = params;

  const query = {
    latitude,
    longitude,
    // Always include these two; caller may pass additional via params.hourly.
    hourly: params.hourly ?? "temperature_2m,weathercode",
  } as const;

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
    throw new Error("Hourly data is missing in Open-Meteo response");
  }

  const interval = hourly.interval();
  const start = Number(hourly.time());
  const end = Number(hourly.timeEnd());
  const steps = (end - start) / interval;

  const time: Date[] = [...Array(steps)].map(
    (_, i) => new Date((start + i * interval + meta.utcOffsetSeconds) * 1000)
  );

  const temperature_2m = hourly.variables(0)!.valuesArray() ?? [];
  // If the user provided a custom hourly list that changes order, this simple
  // positional mapping may break. For now we keep fixed order we set above.
  const weathercode =
    (hourly.variables(1)?.valuesArray?.() as
      | number[]
      | Float32Array
      | Int32Array
      | undefined) ?? [];

  return {
    meta,
    hourly: { time, temperature_2m, weathercode },
  };
}

export default fetchHourlyTemperature;

