import { Controller, useForm } from "react-hook-form";
import type { AddForecastDialogPropsType } from "./types";
import { TextInput } from "../FormInputs";
import FormDialog from "./FormDialog";
import useForecasts from "@/services/weather/hooks/useForecasts";
import { useEffect } from "react";
import type { AddForecast } from "@/services/weather";

function AddForecastDialog(props: AddForecastDialogPropsType) {
  const { control, handleSubmit, reset } = useForm<AddForecast>();

  const forecast = useForecasts();

  const onSubmit = (data: AddForecast) => {
    forecast.addForecast(data);
    props.onClose();
  };

  useEffect(() => {
    reset({});
  }, [props.open, reset]);

  return (
    <FormDialog
      onSubmit={handleSubmit(onSubmit)}
      {...props}
      title="Add Forecast"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { value, ...rest } }) => (
          <TextInput label="Name" value={value ?? ""} {...rest} />
        )}
      />
      <Controller
        name="latitude"
        control={control}
        render={({ field: { value, ...rest } }) => (
          <TextInput
            label="Latitude"
            type="number"
            step="any"
            placeholder="e.g. 40.4168"
            value={value ?? ""}
            {...rest}
          />
        )}
      />
      <Controller
        name="longitude"
        control={control}
        render={({ field: { value, ...rest } }) => (
          <TextInput
            label="Longitude"
            type="number"
            step="any"
            placeholder="e.g. -3.7038"
            value={value ?? ""}
            {...rest}
          />
        )}
      />
      <Controller
        name="url"
        control={control}
        render={({ field: { value, ...rest } }) => (
          <TextInput
            label="Url"
            placeholder="https://api.open-meteo.com/v1/forecast"
            value={value ?? ""}
            {...rest}
          />
        )}
      />
    </FormDialog>
  );
}

export default AddForecastDialog;
