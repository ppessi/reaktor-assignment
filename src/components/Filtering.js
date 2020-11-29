import React from "react";
import { useDispatch } from "react-redux";

import { setFilter } from "../redux/filters";
import { manufacturers } from "../constants";

// The filters above the item list

export const Filtering = () => {
  const dispatch = useDispatch();

  const filterHandler = (key) => (event) => {
    dispatch(setFilter({ key, value: event.target.value }));
  };

  return (
    <>
      <div>Filters:</div>
      <div>
        name: <input type="text" onChange={filterHandler("name")} />
      </div>
      <div>
        manufacturer:{" "}
        <select onChange={filterHandler("manufacturer")}>
          <option value={""}>-</option>
          {manufacturers.map((manufacturer) => (
            <option value={manufacturer} key={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>
      </div>
      <div>
        availability:{" "}
        <select onChange={filterHandler("availability", true)}>
          <option value={-1}>-</option>
          <option value={0}>out of stock</option>
          <option value={1}>less than 10</option>
          <option value={2}>in stock</option>
        </select>
      </div>
    </>
  );
};

export default Filtering;
