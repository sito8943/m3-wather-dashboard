import type { GridItemPropsType } from "./types";

function GridItem(props: GridItemPropsType) {
  const { children } = props;

  return <li className="max-sm:w-full">{children}</li>;
}

export default GridItem;
