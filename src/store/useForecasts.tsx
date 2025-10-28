import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import config from "../config";
import { useLocalStorage } from "../hooks";
import type { WeatherForecastType } from "../lib/types";
import type { AddForecast } from "../lib/models/";

function useForecastsSource() {
  const data = useLocalStorage(config.forecasts, [] as WeatherForecastType[]);

  const updateForecast = useCallback(
    (updatedForecast: WeatherForecastType) => {
      console.log(updatedForecast);
      data.set((prev) =>
        prev.map((item) =>
          item.id === updatedForecast.id ? updatedForecast : item
        )
      );
    },
    [data]
  );

  const addForecast = useCallback(
    (forecast: AddForecast) => {
      data.set((prev) => {
        return [
          ...prev,
          {
            id: Date.now().toString(),
            ...forecast,
          },
        ];
      });
    },
    [data]
  );

  const removeForecast = useCallback(
    (id?: string) => {
      data.set((prev) => (id ? prev.filter((i) => i.id !== id) : []));
    },
    [data]
  );

  return {
    forecasts: data.value,
    removeForecast,
    addForecast,
    updateForecast,
  };
}

type ForecastsContextValue = ReturnType<typeof useForecastsSource>;

const ForecastsContext = createContext<ForecastsContextValue | null>(null);

export function ForecastsProvider({ children }: { children: ReactNode }) {
  const value = useForecastsSource();
  return (
    <ForecastsContext.Provider value={value}>
      {children}
    </ForecastsContext.Provider>
  );
}

function useForecasts() {
  const ctx = useContext(ForecastsContext);
  if (!ctx)
    throw new Error("useForecasts must be used within ForecastsProvider");
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export default useForecasts;
