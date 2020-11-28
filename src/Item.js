import React from "react";

export const Item = ({ style, name, color, price, manufacturer, inStock }) => {
  return (
    <div style={style}>
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div>Colors: {color.join(", ")}</div>
      <div>Price: {price}€</div>
      <div>Manufactured by {manufacturer}</div>
      {inStock === undefined ? (
        <div style={{ color: "grey" }}>Loading availity data</div>
      ) : inStock ? (
        <div style={{ color: "green" }}>in stock</div>
      ) : (
        <div style={{ color: "red" }}>out of stock</div>
      )}
    </div>
  );
};

export default Item;
