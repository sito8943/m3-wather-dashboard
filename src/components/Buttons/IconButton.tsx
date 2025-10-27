import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconButtonPropsType } from "./types";

function IconButton(props: IconButtonPropsType) {
  const {
    icon,
    iconClassName,
    className = "",
    type = "button",
    ...rest
  } = props;

  return (
    <button
      className={`rounded-full w-10 h-10 bg-base/40 hover:bg-primary/50 transition ${className}`}
      type={type}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} className={iconClassName} />
    </button>
  );
}

export default IconButton;
