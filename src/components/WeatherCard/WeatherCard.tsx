import type { WeatherCardPropsType } from "./types";

function WeatherCard(props: WeatherCardPropsType) {
  const { name } = props;

  return (
    <article id={name}>
      <h2>{name}</h2>
    </article>
  );
}

export default WeatherCard;
