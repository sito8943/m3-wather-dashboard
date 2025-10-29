import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { IconButton } from "../Buttons";
import type { DialogPropsType } from "./types";
import { createPortal } from "react-dom";

function Dialog(props: DialogPropsType) {
  const { open, title, onClose, children } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  /**
   * background-color: var(--color-alter-black);
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 360px;
   */

  return createPortal(
    <dialog ref={dialogRef} className="relative bg-base rounded-2xl p-4 w-90 max-sm:w-full max-sm:h-full m-auto">
      <h3>{title}</h3>
      <div>{children}</div>
      <IconButton
        className="text-bg-error absolute top-1 right-1"
        onClick={onClose}
        icon={faClose}
        aria-label="Close"
        title="Close"
      />
    </dialog>,
    document.body
  );
}

export default Dialog;
