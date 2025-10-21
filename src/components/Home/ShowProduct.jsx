import React, { useEffect, useState } from "react";
import axios from "axios";
 

const ShowProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://hackathone-backend-hazel.vercel.app/productApi/getProduct");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border shadow rounded p-4 bg-white">
            <img
              src={product.url}
              alt={product.productName}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-600">{product.discription}</p>
            <p className="text-blue-600 font-bold mt-1">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowProduct;
