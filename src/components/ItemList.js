import { React, useState, useEffect } from "react";
import { Grid } from "react-virtualized";
import { useSelector } from "react-redux";

// Renders and filters product info and availability

export const ItemList = () => {
  const {
    items,
    filters,
    availability,
    selectedCategory: selected,
  } = useSelector((state) => state);
  const [filtered, setFiltered] = useState(items[selected]);

  const widths = [300, 120, 60, 120, 180];
  const columns = ["Name", "Manufacturer", "Price", "Colors", "Availability"];

  useEffect(() => {
    var newFiltered = items[selected];
    if (newFiltered === undefined) return;
    if (filters.name !== "")
      newFiltered = newFiltered.filter((item) =>
        item.name.includes(filters.name.toUpperCase())
      );
    if (filters.manufacturer !== "")
      newFiltered = newFiltered.filter(
        (item) => item.manufacturer === filters.manufacturer
      );
    if (filters.availability !== -1)
      newFiltered = newFiltered.filter(
        (item) =>
          availability[item.manufacturer][item.id] === filters.availability
      );
    setFiltered(newFiltered);
  }, [filters, items, availability, selected]);

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
          const inStock = availability[item.manufacturer][item.id];
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
      <div
        key={key}
        style={{
          ...style,
          // every other row is a light gray for better readability
          backgroundColor: rowIndex % 2 === 0 ? "#e2e2e2" : "white",
          // center align text vertically
          lineHeight: `${style.height}px`,
        }}
      >
        {content}
      </div>
    );
  };

  return (
    <div style={{ marginTop: 40 }}>
      {filtered !== undefined ? (
        filtered.length !== 0 ? (
          <>
            <div className="header">
              {columns.map((col, idx) => (
                <span
                  key={idx}
                  style={{ float: "left", width: widths[idx], height: 30 }}
                >
                  {col}
                </span>
              ))}
            </div>
            <Grid
              cellRenderer={renderCell}
              columnCount={5}
              columnWidth={({ index }) => widths[index]}
              height={600}
              width={widths.reduce((sum, width) => sum + width, 30)}
              rowHeight={40}
              rowCount={filtered.length}
            />
          </>
        ) : (
          "No products match filter"
        )
      ) : (
        "Loading data from server"
      )}
    </div>
  );
};
export default ItemList;
