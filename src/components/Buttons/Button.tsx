import { useMemo } from "react";
import type { ButtonPropsType } from "./types";

function Button(props: ButtonPropsType) {
  const { variant = "filled", type = "button", onClick, children } = props;

  const classNameVariant = useMemo(() => {
    switch (variant) {
      case "filled":
        return "bg-primary text-white hover:bg-primary/80";
      case "outlined":
        return "border border-text text-text hover:bg-primary/80 hover:border-primary/80 hover:text-white";
    }
  }, [variant]);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-4xl h-9 px-4 transition ${classNameVariant}`}
    >
      {children}
    </button>
  );
}

export default Button;
