import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ButtonHTMLAttributes } from "react";

export interface IconButtonPropsType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconDefinition;
  iconClassName?: string;
}
