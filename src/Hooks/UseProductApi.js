import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCatgeoryProductsData } from "../App/ProductSlice";

const UseProductApi = (category) => {
  const dispatch = useDispatch();
  const categoryMap = useSelector(
    (state) => state.product.categoryDataMap
  );

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
  async function getData() {
    try {
      let res = await fetch(`https://dummyjson.com/products/category/${category}`,
      );
      let json = await res.json();

      setProductData(json.products);

      dispatch(
        addCatgeoryProductsData({
          category,
          data: json.products,
        })
      );
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (category) {
    const cacheData = categoryMap?.[category];

    if (cacheData) {
      setProductData(cacheData);
      setLoading(false);
    } else {
      getData();
    }
  }
}, [category, categoryMap, dispatch]);

  return { productData, loading, error };
};

export default UseProductApi;