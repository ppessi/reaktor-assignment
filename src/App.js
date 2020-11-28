import { React, useState, useMemo, useEffect } from "react";

import ItemList from "./ItemList";
import CategorySelect from "./CategorySelect";

const App = () => {
  const categories = useMemo(() => ["accessories", "jackets", "shirts"], []);
  const [selected, setSelected] = useState(categories[0]);
  const [items, setItems] = useState({});
  const [availability, setAvailability] = useState({});
  const [filter, setFilter] = useState("");
  const [errored, setErrored] = useState(new Set());

  useEffect(() => {
    const api_url = "https://bad-api-assignment.reaktor.com";
    const manufacturers = new Set();
    const fetchProductInfo = (category, count = 1) => {
      fetch(`${api_url}/products/${category}`)
        .then((res) => res.json())
        .then((res) => {
          setItems((items) => ({ ...items, [category]: res }));
          setErrored(
            (errored) =>
              new Set([...errored].filter((value) => value !== category))
          );
          const newManufacturers = new Set(
            res.map((item) => item.manufacturer)
          );
          for (const manufacturer of newManufacturers) {
            if (manufacturers.has(manufacturer)) {
              continue;
            }
            manufacturers.add(manufacturer);
            fetchAvailability(manufacturer);
          }
        })
        .catch(() => {
          if (count < 5) {
            fetchProductInfo(category, count + 1);
          } else {
            setErrored((errored) => new Set([...errored, category]));
          }
        });
    };

    const fetchAvailability = (manufacturer, count = 1) => {
      fetch(`${api_url}/availability/${manufacturer}`)
        .then((res) => res.json())
        .then((res) => res.response)
        .then((res) => {
          const availability = {};
          res.forEach((item) => {
            const data = item.DATAPAYLOAD;
            availability[item.id.toLowerCase()] = data.includes("OUT")
              ? 0 // out of stock
              : data.includes("LESSTHAN10")
              ? 1 // less than 10
              : 2; // in stock
          });
          setAvailability((oldAvailability) => ({
            ...oldAvailability,
            ...availability,
          }));
          setErrored(
            (errored) =>
              new Set([...errored].filter((value) => value !== manufacturer))
          );
        })
        .catch(() => {
          if (count < 5) {
            fetchAvailability(manufacturer, count + 1);
          } else {
            setErrored((errored) => new Set([...errored, manufacturer]));
          }
        });
    };

    for (const category of categories) {
      fetchProductInfo(category);
    }
  }, [categories, setItems, setAvailability, setErrored]);

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const selectCategory = (category) => () => {
    setSelected(category);
  };

  return (
    <>
      {errored.size !== 0 && (
        <div style={{ color: "red" }}>
          Fetching data for following categories/manufacturers failed:{" "}
          {[...errored].join(", ")}
        </div>
      )}
      <CategorySelect
        categories={categories}
        select={selectCategory}
        selected={selected}
      />
      {selected in items ? (
        <>
          <div>
            Filter by name: <input type="text" onChange={filterHandler} />
          </div>
          <ItemList
            items={items}
            filter={filter}
            selected={selected}
            availability={availability}
          />
        </>
      ) : (
        <div>Loading data from server</div>
      )}
    </>
  );
};

export default App;
