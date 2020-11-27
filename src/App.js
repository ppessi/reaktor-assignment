import { React, useState, useMemo, useEffect } from "react";
import { List } from "react-virtualized";

import Item from "./Item";

const App = () => {
  const categories = useMemo(() => ["accessories", "jackets", "shirts"], []);
  const [selected, setSelected] = useState(categories[0]);
  const [items, setItems] = useState({});
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

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
          const parser = new DOMParser();
          [].concat(...responses).forEach((item) => {
            const xmlDoc = parser.parseFromString(item.DATAPAYLOAD, "text/xml");
            availability[item.id.toLowerCase()] =
              xmlDoc.getElementsByTagName("INSTOCKVALUE")[0].innerHTML ===
              "INSTOCK";
          });
          setAvailability(availability);
          setLoading(false);
        });
      });
  }, [categories, setLoading, setItems, setAvailability]);

  const select = (category) => () => {
    setSelected(category);
  };

  const renderRow = ({ index, key, style }) => {
    const item = items[selected][index];
    return (
      <Item
        key={key}
        style={style}
        {...items[selected][index]}
        inStock={availability[item.id]}
      />
    );
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
      <List
        width={400}
        height={800}
        rowHeight={100}
        rowCount={items[selected].length}
        rowRenderer={renderRow}
      />
    </>
  );
};

export default App;
