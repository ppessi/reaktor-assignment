import React from "react";

export const CategorySelect = ({ categories, select, selected }) => (
  <>
    {categories.map((category) => (
      <button
        key={category}
        onClick={select(category)}
        className={selected === category ? "selected" : undefined}
      >
        {category}
      </button>
    ))}
  </>
);

export default CategorySelect;
