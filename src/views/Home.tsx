import { useState } from "react";
import { Grid, Header, WeatherCard } from "@/components";
import { EditForecastDialog, ConfirmationDialog } from "@/components/Dialogs";
import useForecasts from "@/services/weather/hooks/useForecasts";

function Home() {
  const { forecasts, removeForecast } = useForecasts();

  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [refreshAt, setRefreshAt] = useState<number>(() => Date.now());

  const onEdit = (id: string) => setEditing(id);

  const onDelete = (id: string) => setDeleting(id);

  return (
    <div className="flex flex-col gap-4">
      <Header onRefresh={() => setRefreshAt(Date.now())} />
      <main className="px-3">
        {forecasts?.length > 0 ? (
          <Grid
            items={forecasts}
            renderComponent={(item) => (
              <WeatherCard
                onDeleteClick={onDelete}
                onEditClick={onEdit}
                refreshAt={refreshAt}
                {...item}
              />
            )}
          />
        ) : (
          <p className="text-text-muted/50 text-center mt-10">
            No forecasts available. Click the "+" button to add a new forecast.
          </p>
        )}
      </main>

      <EditForecastDialog
        id={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
      />
      <ConfirmationDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          removeForecast(String(deleting));
          setDeleting(null);
        }}
        title="Delete Forecast"
      >
        <p>Are you sure you want to delete this forecast?</p>
      </ConfirmationDialog>
    </div>
  );
}

export default Home;
