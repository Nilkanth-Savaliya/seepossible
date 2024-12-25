import { useEffect, useState } from "react";
import TextField from "../form-fields/text";
import { useAppSelector } from "@/redux/hooks";

const ProductForm = ({
  closeSlideOver,
  createProductFunction,
  updateProductFunction,
}) => {
  const { currentProduct, isEditProduct } = useAppSelector(
    (state) => state.products
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    sku: "",
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditProduct) {
      updateProductFunction(currentProduct.id, formData);
    } else {
      createProductFunction(formData);
    }
  };

  useEffect(() => {
    if (!currentProduct) return;
    setFormData({
      title: currentProduct?.title || "",
      description: currentProduct?.description || "",
      category: currentProduct?.category || "",
      price: currentProduct?.price || "",
      discountPercentage: currentProduct?.discountPercentage || "",
      stock: currentProduct?.stock || "",
      brand: currentProduct?.brand || "",
      sku: currentProduct?.sku || "",
      weight: currentProduct?.weight || "",
      warrantyInformation: currentProduct?.warrantyInformation || "",
      shippingInformation: currentProduct?.shippingInformation || "",
      availabilityStatus: currentProduct?.availabilityStatus || "",
      returnPolicy: currentProduct?.returnPolicy || "",
      minimumOrderQuantity: currentProduct?.minimumOrderQuantity || "",
      thumbnail: currentProduct?.thumbnail || "",
    });
  }, [currentProduct]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Title"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <TextField
          type="text"
          placeholder="Description"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <TextField
          type="text"
          placeholder="Category"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />

        <TextField
          type="number"
          placeholder="Price"
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <button className="my-2 primary-button" type="submit">
          {isEditProduct ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
