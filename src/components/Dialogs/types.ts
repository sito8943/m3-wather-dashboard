export type DialogPropsType = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export interface FormDialogPropsType extends DialogPropsType {
  submitText?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface ConfirmationDialogPropsType extends DialogPropsType {
  confirmText?: string;
  onConfirm: () => void;
}

export type AddForecastDialogPropsType = Omit<
  FormDialogPropsType,
  "onSubmit" | "title" | "children"
>;

export interface EditForecastDialogPropsType extends AddForecastDialogPropsType {
  id: string | null;
}
