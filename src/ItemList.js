import { React, useState, useEffect } from "react";
import { Grid } from "react-virtualized";

export const ItemList = ({ items, filter, selected, availability }) => {
  const [filtered, setFiltered] = useState([]);
  const widths = [300, 70, 40, 120, 180];

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

  const renderCell = ({ columnIndex, rowIndex, key, style }) => {
    const item = filtered[rowIndex];
    var content = (() => {
      switch (columnIndex) {
        case 0:
          return item.name;
        case 1:
          return item.manufacturer;
        case 2:
          return item.price;
        case 3:
          return item.color.join(", ");
        case 4:
          const inStock = availability[item.id];
          return inStock === undefined ? (
            <div style={{ color: "grey" }}>Loading availity data</div>
          ) : inStock === 0 ? (
            <div style={{ color: "red" }}>out of stock</div>
          ) : inStock === 1 ? (
            <div style={{ color: "orange" }}>less than 10</div>
          ) : (
            <div style={{ color: "green" }}>in stock</div>
          );
        default:
          return "";
      }
    })();
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <Grid
      className="list"
      cellRenderer={renderCell}
      columnCount={5}
      columnWidth={({ index }) => widths[index]}
      height={600}
      width={widths.reduce((sum, width) => sum + width, 30)}
      rowHeight={40}
      rowCount={filtered.length}
    />
  );
};
export default ItemList;
