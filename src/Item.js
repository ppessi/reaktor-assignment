import React from "react";

export const Item = ({ style, name, color, price, manufacturer, inStock }) => {
  return (
    <div style={style}>
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div>Colors: {color.join(", ")}</div>
      <div>{price}€</div>
      <div>Manufactured by {manufacturer}</div>
      <div>{inStock ? "in stock" : "out of stock"}</div>
    </div>
  );
};

export default Item;
