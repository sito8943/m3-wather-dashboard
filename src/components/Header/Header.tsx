import { faAdd, faTrash, faRotate } from "@fortawesome/free-solid-svg-icons";
import useForecasts from "../../store/useForecasts";
import { IconButton } from "../Buttons";
import { AddForecastDialog } from "../Dialogs";
import { useState } from "react";

type HeaderProps = {
  onRefresh?: () => void;
};

function Header({ onRefresh }: HeaderProps) {
  const { removeForecast } = useForecasts();

  const [showAdd, setShowAdd] = useState(false);

  return (
    <header className="flex items-center justify-between py-4 px-4 bg-hover-primary">
      <h1 className="text-base">Weather Dashboard</h1>
      <div className="flex items-center gap-2">
        <IconButton
          name="refresh-forecasts"
          aria-label="Refresh forecasts"
          title="Refresh forecasts"
          type="button"
          onClick={onRefresh}
          icon={faRotate}
        />
        <IconButton
          name="add-forecast"
          aria-label="Add forecast"
          title="Add forecast"
          type="button"
          onClick={() => setShowAdd(true)}
          icon={faAdd}
        />
        <IconButton
          name="clear-all"
          aria-label="Clear all forecasts"
          title="Clear all forecasts"
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
