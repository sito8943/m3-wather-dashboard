import type { JSX } from "react";
import type { WeatherForecastType } from "../../lib/types";

export type GridItemPropsType = {
  children: React.ReactNode;
};

export type GridPropsType = {
  items: WeatherForecastType[];
  renderComponent: (item: WeatherForecastType) => JSX.Element;
};
