import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { VITE_BACKEND_URL } from "../App";

const EditPage = () => {
  /* retrieve the id from the backend */
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });
  /*
How to Perform HTTP Requests with Axios – A Complete Guide
Axios Get Request

Axios can make a GET request to “get” data from a server API. The axios. get() method is used to make an HTTP get request. There are two parameters that must be passed to the Axios get() method. It first requires the service endpoint's URI.*/
  const getProduct = async () => {
    setIsLoading(true);
    try {
      /*async await because it is asynchronous */
      const response = await axios.get(
        `${VITE_BACKEND_URL}/api/products/${id}`
      );

      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  /*beacuse its axios we have to use await*/
  /* You detect an error and console it out:
Try{}
catch(error){console.log(error)}*/

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `https://node-api-v2-7ohu.onrender.com/api/products/${id}`,
        product
      );
      toast.success("Update a product succesfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Update a product - {product.name}
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div action="space-y-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={product.name}
                  /*When a user enter something we use onChange() and then arrow function, detect event and then setProduct(), for example you want to set the name
                   */
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Image URL "
                />
              </div>
              {!isLoading && (
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursur-pointer">
                  Update
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
