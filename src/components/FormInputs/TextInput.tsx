import { forwardRef, type ForwardedRef } from "react";
import type { TextInputPropsType } from "./types";

const TextInput = forwardRef(function (
  props: TextInputPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { label, ...rest } = props;

  return (
    <div className="flex flex-col gap-1">
      <label className="">{label}</label>
      <input
        ref={ref}
        type="text"
        {...rest}
        className="border border-primary rounded-4xl h-9 px-4"
      />
    </div>
  );
});

export default TextInput;
