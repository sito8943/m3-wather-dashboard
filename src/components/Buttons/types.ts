import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ButtonHTMLAttributes } from "react";

type ButtonBasePropsType = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonPropsType extends ButtonBasePropsType {
  variant: "filled" | "outlined";
}

export interface IconButtonPropsType extends ButtonBasePropsType {
  icon: IconDefinition;
  iconClassName?: string;
}
