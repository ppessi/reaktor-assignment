import { React, useEffect, useState, useMemo } from "react";
import { List } from "react-virtualized";

import Item from "./Item";

const App = () => {
  const [selected, setSelected] = useState("accessories");
  const [accessories, setAccessories] = useState([]);
  const [jackets, setJackets] = useState([]);
  const [shirts, setShirts] = useState([]);

  const items = { accessories, jackets, shirts };

  const select = (category) => () => {
    setSelected(category);
  };

  const categories = useMemo(() => ["accessories", "jackets", "shirts"], []);

  useEffect(() => {
    const api_url = "https://bad-api-assignment.reaktor.com";

    const setters = {
      accessories: setAccessories,
      jackets: setJackets,
      shirts: setShirts,
    };

    const fetchCategory = (category) => {
      fetch(`${api_url}/products/${category}`)
        .then((res) => res.json())
        .then((content) => setters[category](content));
    };
    for (const category of categories) fetchCategory(category);
  }, [setSelected, setAccessories, setJackets, categories]);

  const renderRow = ({ index, key, style }) => (
    <Item key={key} style={style} {...items[selected][index]} />
  );

  return (
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
