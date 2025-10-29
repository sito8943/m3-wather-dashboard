import type { WeatherForecastType } from "../../lib/types";

export interface WeatherCardPropsType extends WeatherForecastType {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string, name: string) => void;
  refreshAt?: number;
}
