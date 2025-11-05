import type { ForecastParams } from ".";

export interface WeatherForecastType extends ForecastParams {
  id: string;
  name: string;
};

export type UpdateForecast = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  url: string;
};

export type AddForecast = {
  name: string;
  latitude: number;
  longitude: number;
  url: string;
};
