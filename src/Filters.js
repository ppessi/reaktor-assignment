import React from "react";

export const Filters = ({ setFilters, manufacturers }) => {
  const filterHandler = (key, isNumber = false) => (e) => {
    const newValue = e.target.value;
    setFilters((filters) => ({
      ...filters,
      [key]: isNumber ? parseInt(newValue) : newValue,
    }));
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

export default Filters;
