import { React, useState, useMemo, useEffect } from "react";

import ItemList from "./ItemList";

const App = () => {
  const categories = useMemo(() => ["accessories", "jackets", "shirts"], []);
  const [selected, setSelected] = useState(categories[0]);
  const [items, setItems] = useState({});
  const [availability, setAvailability] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const api_url = "https://bad-api-assignment.reaktor.com";
    const manufacturers = new Set();
    const fetchProductInfo = (category) => {
      fetch(`${api_url}/products/${category}`)
        .then((res) => res.json())
        .then((res) => {
          setItems((items) => ({ ...items, [category]: res }));
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
        });
    };

    const fetchAvailability = (manufacturer) => {
      fetch(`${api_url}/availability/${manufacturer}`)
        .then((res) => res.json())
        .then((res) => res.response)
        .then((res) => {
          const availability = {};
          res.forEach((item) => {
            availability[item.id.toLowerCase()] = !item.DATAPAYLOAD.includes(
              "OUT"
            );
          });
          setAvailability((oldAvailability) => ({
            ...oldAvailability,
            ...availability,
          }));
        });
    };

    for (const category of categories) {
      fetchProductInfo(category);
    }
  }, [categories, setItems, setAvailability]);

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const select = (category) => () => {
    setSelected(category);
  };

  return (
    <>
      {categories.map((category) => (
        <button key={category} onClick={select(category)}>
          {category}
        </button>
      ))}
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
