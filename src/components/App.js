import { React } from "react";

import ItemList from "./ItemList";
import CategorySelect from "./CategorySelect";
import Filtering from "./Filtering";
import DataLoader from "./DataLoader";

const App = () => {
  return (
    <>
      <DataLoader />
      <CategorySelect />
      <Filtering />
      <ItemList />
    </>
  );
};

export default App;
