"use client";

import Alert from "@/componets/alert-message";
import TextField from "@/componets/form-fields/text";
import Pagination from "@/componets/pagination";
import ProductCard from "@/componets/product-card";
import {
  getProducts,
  setProductCurrentPage,
} from "@/redux/reducer/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const { products, isLoading, total, current_page, pageSize, search } =
    useSelector((state) => state.products);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(
        getProducts({
          page: current_page,
          pageSize: pageSize,
          search: searchTerm,
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
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [current_page, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(total / pageSize)) return;
    dispatch(setProductCurrentPage(newPage));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
          <TextField
            type="text"
            placeholder="Search Products"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            error={""}
          />
          <div className="mt-8 grid grid-cols-3 gap-y-12 gap-x-6 ">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Pagination
        current_page={current_page}
        pageSize={pageSize}
        total={total}
        handlePageChange={handlePageChange}
      />
    </>
  );
};
export default ProductList;
