import Home from "./views/Home";
import { ForecastsProvider } from "./store/useForecasts";

function App() {
  return (
    <ForecastsProvider>
      <Home />
    </ForecastsProvider>
  );
}

export default App;
