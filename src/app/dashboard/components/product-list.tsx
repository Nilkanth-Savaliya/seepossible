"use client";

import Alert from "@/componets/alert-message";
import ProductCard from "@/componets/product-card";
import { getProducts } from "@/redux/reducer/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const { products, isLoading, isError, current_page, pageSize, search } =
    useSelector((state) => state.products);
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts({
        page: current_page,
        pageSize: pageSize,
        search,
      })
    )
      .unwrap()
      .then(() => {
        setAlert({
          type: "info",
          message: "Products loaded successfully",
        });
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.message || "Failed to load Products",
        });
      });
  }, [current_page, search]);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Products</h2>

          <div className="mt-8 grid grid-cols-3 gap-y-12 gap-x-6 ">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;
