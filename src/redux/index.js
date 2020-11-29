import { combineReducers } from "redux";
import items from "./items";
import availability from "./availability";
import selectedCategory from "./selectedCategory";
import filters from "./filters";

export default combineReducers({
  items,
  availability,
  selectedCategory,
  filters,
});
