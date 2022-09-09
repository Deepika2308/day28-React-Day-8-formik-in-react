import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {API} from "./global.js";


export function EditProduct({ editProduct }) {
  console.log(`edit prod is ${JSON.stringify(typeof editProduct.price)}`);
  let navigate = useNavigate();

  let formValidation = yup.object({
    id: yup.string().required("Required!"),
    title: yup.string().required("Required!"),
    description: yup.string().min(4).required("Required!"),
    price: yup.number().positive("Price should be grater than 0").required("Required!"),
    discountPercentage: yup.number().min(0, "Discount Percentage should be 0 or more than 0").max(100, "Discount percent should be less than or equal to 100").required("Required!"),
    rating: yup.number().min(0, "Rate between 0-5").max(5, "Rate between 0-5").required("Required!"),
    stock: yup.number().min(0, "Stock should be 0 or more than 0").required("Required!"),
    brand: yup.string().required("Required!"),
    category: yup.string().required("Required!"),
    thumbnail: yup.string().url("Please enter the right URL").required("Required!"),
  });


  let formik = useFormik({
    initialValues: editProduct,
    validationSchema: formValidation,
    onSubmit: (values) => {
      console.log(values);
      fetch(`${API}/products/${editProduct.id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        }
      ).then((response) => navigate("/products"));
    },
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Product Form</h3>
      <form
        className="create-product-form d-flex flex-column gap-3"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Product ID"
          className="form-control"
          value={formik.values.id}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.id ? (
          <div className="text-start text-danger">{formik.errors.id}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="form-control"
          value={formik.values.title}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.title ? (
          <div className="text-start text-danger">{formik.errors.title}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={formik.values.description}
          className="form-control"
          onChange={formik.handleChange}
        ></input>
        {formik.errors.description ? (
          <div className="text-start text-danger">{formik.errors.description}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          className="form-control"
          value={formik.values.price}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.price ? (
          <div className="text-start text-danger">{formik.errors.price}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="discountPercentage"
          name="discountPercentage"
          placeholder="Discount"
          value={formik.values.discountPercentage}
          className="form-control"
          onChange={formik.handleChange}
        ></input>
        {formik.errors.discountPercentage ? (
          <div className="text-start text-danger">{formik.errors.discountPercentage}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="rating"
          name="rating"
          placeholder="Rating"
          className="form-control"
          value={formik.values.rating}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.rating ? (
          <div className="text-start text-danger">{formik.errors.rating}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock Numbers"
          className="form-control"
          value={formik.values.stock}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.stock ? (
          <div className="text-start text-danger">{formik.errors.stock}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Brand Name"
          className="form-control"
          value={formik.values.brand}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.brand ? (
          <div className="text-start text-danger">{formik.errors.brand}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Category"
          className="form-control"
          value={formik.values.category}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.category ? (
          <div className="text-start text-danger">{formik.errors.category}</div>
        ) : (
          ""
        )}
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          placeholder="Img Src"
          className="form-control"
          value={formik.values.thumbnail}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.thumbnail ? (
          <div className="text-start text-danger">{formik.errors.thumbnail}</div>
        ) : (
          ""
        )}

        <div className="d-flex flex-column gap-3 align-items-center">
          <button type="submit" className="btn btn-primary col-3">
            Update
          </button>
          <button type="cancel" className="btn btn-secondary col-3" onClick={() => navigate("/products")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
