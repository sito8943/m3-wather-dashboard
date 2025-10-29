import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../Buttons";
import type { WeatherCardPropsType } from "./types";
import fetchHourlyTemperature from "../../lib/openmeteo";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getWeatherText } from "./utils";

function WeatherCard(props: WeatherCardPropsType) {
  const { id, name, onEditClick, onDeleteClick, latitude, longitude, url, hourly } = props;
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  const weatherText = useMemo(() => getWeatherText(weatherCode), [weatherCode]);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchHourlyTemperature({ latitude, longitude, url, hourly });
      const { time, temperature_2m, weathercode } = data.hourly;

      if (!time?.length || !temperature_2m?.length) {
        setTemperature(null);
        return;
      }

      const now = new Date();
      // Find the closest hour index to "now"
      let closestIdx = 0;
      let smallestDiff = Number.POSITIVE_INFINITY;
      for (let i = 0; i < time.length; i++) {
        const diff = Math.abs(time[i].getTime() - now.getTime());
        if (diff < smallestDiff) {
          smallestDiff = diff;
          closestIdx = i;
        }
      }

      const value = Number(temperature_2m[closestIdx]);
      const code = Number(weathercode[closestIdx]);
      setTemperature(Number.isFinite(value) ? value : null);
      setWeatherCode(Number.isFinite(code) ? code : null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load forecast");
      setTemperature(null);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, url, hourly]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <article
      id={name}
      className="flex flex-col border-2 border-base-dark rounded-3xl p-5 gap-4 md:min-w-50 max-sm:w-full"
    >
      <header className="flex items-center justify-between gap-4">
        <h2>{name}</h2>
        <div className="flex gap-2">
          <IconButton onClick={() => onEditClick(id)} icon={faEdit} />
          <IconButton
            onClick={() => onDeleteClick(id, name)}
            icon={faTrash}
            className="text-bg-error"
          />
        </div>
      </header>
      <div className="flex items-end justify-start gap-2">
        <span className="text-4xl font-semibold">
          {loading ? "…" : temperature === null ? "—" : temperature.toFixed(1)}
        </span>
        <span className="text-lg text-text-muted">{loading ? "" : "°C"}</span>
      </div>
      {!loading && !error && weatherText ? (
        <p className="text-sm text-text-muted">{weatherText}</p>
      ) : null}
      {error ? <p className="text-sm text-bg-error">{error}</p> : null}
    </article>
  );
}

const areEqual = (
  prev: WeatherCardPropsType,
  next: WeatherCardPropsType
) =>
  prev.id === next.id &&
  prev.name === next.name &&
  prev.latitude === next.latitude &&
  prev.longitude === next.longitude &&
  prev.url === next.url &&
  prev.hourly === next.hourly;

export default memo(WeatherCard, areEqual);
