import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
  //products are storred in array, that is why useState[]
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://node-api-v2-7ohu.onrender.com/api/products`
      );
      console.log(response.data);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //IS CALLED WHEN THE APLLICATION IS FIRST LOAD, when the app is load we call this method getProducts()
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    <Product
                      key={index}
                      product={product}
                      getProducts={getProducts}
                    />
                  );
                })}
              </>
            ) : (
              <div> There is no product</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

//What is useState, useState() is React Hook that allows you to add state to a functional component. It returns an array with two values: the current state and a function to update it. The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.
//What is axios?. In ReactJS, Axios is a library that serves to create HTTP requests that are present externally. It is evident from the fact that we may sometimes in React applications need to get data from the external source. It is quite difficult to fetch such data so that they can be normally shown on the website.
