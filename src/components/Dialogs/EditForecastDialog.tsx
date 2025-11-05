import { Controller, useForm } from "react-hook-form";
import type { EditForecastDialogPropsType } from "./types";
import { TextInput } from "../FormInputs";
import FormDialog from "./FormDialog";
import useForecasts from "../../services/weather/hooks/useForecasts";
import { useEffect } from "react";
import type { UpdateForecast } from "../../services/weather";

function EditForecastDialog(props: EditForecastDialogPropsType) {
  const { id } = props;
  const { control, handleSubmit, reset } = useForm<UpdateForecast>();

  const forecast = useForecasts();

  const toUpdate = forecast.getForecastById(id);

  const onSubmit = (data: UpdateForecast) => {
    forecast.updateForecast(data);
    props.onClose();
  };

  useEffect(() => {
    if (toUpdate) reset({ ...toUpdate });
    else reset({});
  }, [props.open, reset, toUpdate]);

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

export default EditForecastDialog;
