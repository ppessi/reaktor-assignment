import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCategoryItems } from "../redux/items";
import { addAvailability } from "../redux/availability";
import { categories, api_url, manufacturers } from "../constants";

export const DataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductInfo = (category) => {
      fetch(`${api_url}/products/${category}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(setCategoryItems({ category, items: res }));
        })
        .catch((err) => {
          console.log(err);
          console.log(`Attempting to fetch product info of ${category} again`);
          fetchProductInfo(category);
        });
    };

    for (const category of categories) {
      fetchProductInfo(category);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchAvailability = (manufacturer) => {
      fetch(`${api_url}/availability/${manufacturer}`)
        .then((res) => res.json())
        .then((res) => res.response)
        .then((res) => {
          const availability = {};
          res.forEach((item) => {
            const data = item.DATAPAYLOAD;
            // availability is coded with numbers for the sake of ease
            availability[item.id.toLowerCase()] = data.includes("OUT")
              ? 0 // out of stock
              : data.includes("LESSTHAN10")
              ? 1 // less than 10
              : 2; // in stock
          });
          dispatch(addAvailability({ manufacturer, availability }));
        })
        .catch((err) => {
          console.log(err);
          console.log(
            `Attempting to fetch availability data for ${manufacturer} again`
          );
          fetchAvailability(manufacturer);
        });
    };
    for (const manufacturer of manufacturers) {
      fetchAvailability(manufacturer);
    }
  }, [dispatch]);

  return null;
};

export default DataLoader;
