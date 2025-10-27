import type { GridItemPropsType } from "./types";

function GridItem(props: GridItemPropsType) {
  const { children } = props;

  return <li>{children}</li>;
}

export default GridItem;
