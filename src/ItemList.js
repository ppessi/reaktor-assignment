import { React, useState, useEffect } from "react";
import { List } from "react-virtualized";

import Item from "./Item";

export const ItemList = ({ items, filter, selected, availability }) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (filter === "") {
      setFiltered(items[selected]);
    } else {
      setFiltered(
        items[selected].filter((item) =>
          item.name.includes(filter.toUpperCase())
        )
      );
    }
  }, [filter, selected, items]);

  const renderRow = ({ index, key, style }) => {
    const item = filtered[index];
    return (
      <Item key={key} style={style} {...item} inStock={availability[item.id]} />
    );
  };

  return (
    <List
      width={400}
      height={800}
      rowHeight={100}
      rowCount={filtered.length}
      rowRenderer={renderRow}
    />
  );
};
export default ItemList;
