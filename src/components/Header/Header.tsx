import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { WeatherForecastType } from "../../lib/types";
import useForecasts from "../../store/useForecasts";
import { IconButton } from "../Buttons";

function Header() {
  const { forecasts, addForecast, removeForecast } = useForecasts();

  return (
    <header className="flex items-center justify-between px-4">
      <h1>Weather Dashboard</h1>
      <div className="flex items-center gap-2">
        <IconButton
          name="add-forecast"
          aria-label="Click to add a new forecast"
          type="button"
          onClick={() =>
            addForecast({
              name: `Location ${forecasts.length + 1}`,
            } as WeatherForecastType)
          }
          icon={faAdd}
        />
        <IconButton
          name="clear-all"
          aria-label="Click to clear all forecasts"
          className="text-bg-error"
          onClick={() => removeForecast()}
          icon={faTrash}
        />
      </div>
    </header>
  );
}

export default Header;
