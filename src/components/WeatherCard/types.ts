import type { WeatherForecastType } from "../../services/weather/types";

export interface WeatherCardPropsType extends WeatherForecastType {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string, name: string) => void;
  refreshAt?: number;
}
