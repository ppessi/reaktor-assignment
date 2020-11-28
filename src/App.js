import { React, useState, useMemo, useEffect } from "react";

import ItemList from "./ItemList";

const App = () => {
  const categories = useMemo(() => ["accessories", "jackets", "shirts"], []);
  const [selected, setSelected] = useState(categories[0]);
  const [items, setItems] = useState({});
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const api_url = "https://bad-api-assignment.reaktor.com";
    Promise.all(
      categories.map((category) => {
        return fetch(`${api_url}/products/${category}`)
          .then((res) => res.json())
          .then((res) => ({ [category]: res }));
      })
    )
      .then((content) => {
        const items = content.reduce(
          (prev, current) => ({ ...prev, ...current }),
          {}
        );
        setItems(items);
        return new Set(
          []
            .concat(...content.map((object) => Object.values(object)[0]))
            .map((item) => item.manufacturer)
        );
      })
      .then((manufacturers) => {
        Promise.all(
          [...manufacturers].map((manufacturer) => {
            return fetch(`${api_url}/availability/${manufacturer}`)
              .then((res) => res.json())
              .then((res) => res.response);
          })
        ).then((responses) => {
          const availability = {};
          responses.forEach((list) =>
            list.forEach((item) => {
              availability[item.id.toLowerCase()] = !item.DATAPAYLOAD.includes(
                "OUT"
              );
            })
          );
          setAvailability(availability);
          setLoading(false);
        });
      });
  }, [categories, setLoading, setItems, setAvailability]);

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const select = (category) => () => {
    setSelected(category);
  };

  return loading ? (
    <div>Loading data from server</div>
  ) : (
    <>
      {categories.map((category) => (
        <button key={category} onClick={select(category)}>
          {category}
        </button>
      ))}
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
  );
};

export default App;
