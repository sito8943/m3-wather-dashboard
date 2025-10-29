import { Button } from "../Buttons";
import Dialog from "./Dialog";
import type { ConfirmationDialogPropsType } from "./types";

function ConfirmationDialog(props: ConfirmationDialogPropsType) {
  const {
    title,
    children,
    confirmText = "Ok",
    onConfirm,
    onClose,
    open,
  } = props;

  return (
    <Dialog title={title} onClose={onClose} open={open}>
      <div className="flex flex-col gap-3">
        {children}
        <div className="flex items-center justify-end gap-2">
          <Button variant="filled" onClick={onConfirm} type="button">
            {confirmText}
          </Button>
          <Button variant="outlined" onClick={onClose} type="button">
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
