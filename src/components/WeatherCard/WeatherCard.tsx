import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../Buttons";
import type { WeatherCardPropsType } from "./types";
import fetchHourlyTemperature from "../../lib/openmeteo";
import { useCallback, useEffect } from "react";

function WeatherCard(props: WeatherCardPropsType) {
  const { name } = props;

  const init = useCallback(async () => {
    const data = await fetchHourlyTemperature(props);
    console.log(data);
  }, [props]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <article
      id={name}
      className="flex flex-col border-2 border-base-dark rounded-3xl p-5"
    >
      <header className="flex items-center justify-between gap-4">
        <h2>{name}</h2>
        <IconButton icon={faEdit} />
      </header>
    </article>
  );
}

export default WeatherCard;
