import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import useForecasts from "../../store/useForecasts";
import { IconButton } from "../Buttons";
import { AddForecastDialog } from "../Dialogs";
import { useState } from "react";

function Header() {
  const { removeForecast } = useForecasts();

  const [showAdd, setShowAdd] = useState(false);

  return (
    <header className="flex items-center justify-between py-4 px-4 bg-hover-primary">
      <h1 className="text-base">Weather Dashboard</h1>
      <div className="flex items-center gap-2">
        <IconButton
          name="add-forecast"
          aria-label="Click to add a new forecast"
          type="button"
          onClick={() => setShowAdd(true)}
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
      <AddForecastDialog open={showAdd} onClose={() => setShowAdd(false)} />
    </header>
  );
}

export default Header;
