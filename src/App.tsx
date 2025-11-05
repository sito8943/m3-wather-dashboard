import Home from "@/views/Home";
import { ForecastsProvider } from "@/services/weather/hooks/useForecasts";

function App() {
  return (
    <ForecastsProvider>
      <Home />
    </ForecastsProvider>
  );
}

export default App;
