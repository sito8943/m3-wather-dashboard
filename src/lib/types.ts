import type { ForecastParams } from "./openmeteo";

export interface WeatherForecastType extends ForecastParams {
  id: string;
  name: string;
};
