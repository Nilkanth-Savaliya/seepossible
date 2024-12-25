import { TrashIcon } from "@heroicons/react/24/outline";
import AlertModal from "../alert-modal";
import { useState, useCallback } from "react";
import { deleteProduct, getProducts } from "@/redux/reducer/product-slice";
import Alert from "../alert-message";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ProductCard = ({ product, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const { current_page, pageSize, search } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  const deleteProductFunc = useCallback(() => {
    try {
      dispatch(deleteProduct({ productId: product.id }))
        .unwrap()
        .then(() => {
          setOpen(false);
          setAlert({
            type: "success",
            message: `Product ${product?.title} deleted successfully`,
          });
          dispatch(
            getProducts({
              page: current_page,
              pageSize: pageSize,
              search,
            })
          );
        })
        .catch((error) => {
          setOpen(false);
          setAlert({
            type: "error",
            message:
              error.message || `Failed to delete product ${product?.title}`,
          });
        });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Failed to delete product " + product?.title,
      });
    }
  }, [dispatch, product.id, product?.title, current_page, pageSize, search]);

  const handleDelete = () => {
    setOpen(true);
  };

  return (
    <div key={product.id}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <AlertModal
        open={open}
        close={setOpen}
        title={"Delete " + product.title}
        message={`Are you sure you want to Delete ${product.title}} ?`}
        btnText="Delete"
        action={() => {
          deleteProductFunc();
          setOpen(false);
        }}
      />
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            alt={product.title}
            src={product.thumbnail}
            className="size-full object-cover"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {product.shippingInformation}
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            ${product.price}
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <a
          href={product.href}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 w-full"
          onClick={() => handleEdit(product)}
        >
          Edit
        </a>
        <button
          className="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          onClick={handleDelete}
        >
          <TrashIcon className="h-5 w-5 text-red-700 " />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
