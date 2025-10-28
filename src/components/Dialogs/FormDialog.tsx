import { Button } from "../Buttons";
import Dialog from "./Dialog";
import type { FormDialogPropsType } from "./types";

function FormDialog(props: FormDialogPropsType) {
  const {
    title,
    children,
    submitText = "Submit",
    onClose,
    open,
    onSubmit,
  } = props;

  return (
    <Dialog title={title} onClose={onClose} open={open}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {children}
        <div className="flex items-center justify-end gap-2">
          <Button variant="filled" type="submit">
            {submitText}
          </Button>
          <Button variant="outlined" onClick={onClose} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default FormDialog;
