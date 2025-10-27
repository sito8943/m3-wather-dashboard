import GridItem from "./GridItem";
import type { GridPropsType } from "./types";

function Grid(props: GridPropsType) {
  const { items, renderComponent } = props;

  return (
    <ul className="flex flex-wrap items-center justify-center">
      {items?.map((item) => (
        <GridItem key={item.name}>{renderComponent(item)}</GridItem>
      ))}
    </ul>
  );
}

export default Grid;
