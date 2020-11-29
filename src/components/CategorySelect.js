import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { categories } from "../constants";
import { selectCategory } from "../redux/selectedCategory";

// The category select buttons at the top of the page

export const CategorySelect = () => {
  const selected = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();

  const select = (category) => () => {
    dispatch(selectCategory(category));
  };

  return (
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
};

export default CategorySelect;
