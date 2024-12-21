"use client";

import Alert from "@/componets/alert-message";
import TextField from "@/componets/form-fields/text";
import Pagination from "@/componets/pagination";
import ProductCard from "@/componets/product-card";
import ProductForm from "@/componets/product-form";
import SlideOverPanel from "@/componets/side-over-panel";
import {
  createProduct,
  getProducts,
  setCurrentProduct,
  setEditProduct,
  setProductCurrentPage,
  updateProduct,
} from "@/redux/reducer/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const { products, isLoading, isEditProduct, total, current_page, pageSize } =
    useSelector((state) => state.products);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
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

  const handleEdit = (product) => {
    dispatch(setCurrentProduct(product));
    dispatch(setEditProduct(true));
    setIsSlideOverOpen(true);
  };

  const handleCreate = () => {
    dispatch(setEditProduct(false));
    setIsSlideOverOpen(true);
  };

  const createProductFunction = (productData) => {
    dispatch(createProduct({ data: productData }))
      .unwrap()
      .then(() => {
        setAlert({
          type: "info",
          message: "Product created successfully",
        });
        dispatch(
          getProducts({
            page: current_page,
            pageSize: pageSize,
          })
        );
        setIsSlideOverOpen(false);
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.message || "Failed to create product",
        });
      });
  };

  const updateProductFunction = (id, productData) => {
    dispatch(updateProduct({ id: id, productData: productData }))
      .unwrap()
      .then(() => {
        setAlert({
          type: "success",
          message: `Product ${productData.title} updated successfully`,
        });
        dispatch(
          getProducts({
            page: current_page,
            pageSize: pageSize,
          })
        );
        dispatch(setCurrentProduct(null));
        dispatch(setEditProduct(false));
        setIsSlideOverOpen(false);
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message:
            error.message || "Failed to update product " + productData.title,
        });
      });
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
      <SlideOverPanel
        open={isSlideOverOpen}
        setOpen={setIsSlideOverOpen}
        label={isEditProduct ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          closeSlideOver={setIsSlideOverOpen}
          createProductFunction={createProductFunction}
          updateProductFunction={updateProductFunction}
        ></ProductForm>
      </SlideOverPanel>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Products</h2>
          <div className="flex gap-3 justify-between mt-3">
            <div className="w-1/2">
              <TextField
                type="text"
                placeholder="Search Products"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                error={""}
              />
            </div>
            <button className="primary-button" onClick={handleCreate}>
              Add Product
            </button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-y-12 gap-x-6 ">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleEdit={handleEdit}
              />
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
