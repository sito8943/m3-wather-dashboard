import { Grid, Header, WeatherCard } from "../components";
import useForecasts from "../store/useForecasts";

function Home() {
  const { forecasts } = useForecasts();

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <main>
        <Grid
          items={forecasts}
          renderComponent={(item) => <WeatherCard {...item} />}
        />
      </main>
    </div>
  );
}

export default Home;
