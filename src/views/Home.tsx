import { Grid, Header, WeatherCard } from "../components";
import useForecasts from "../store/useForecasts";

function Home() {
  const { forecasts } = useForecasts();

  return (
    <>
      <Header />
      <main>
        <Grid
          items={forecasts}
          renderComponent={(item) => <WeatherCard {...item} />}
        />
      </main>
    </>
  );
}

export default Home;
