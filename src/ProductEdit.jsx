import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit({ handleEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(
    function () {
      (async function getProById() {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        reset(data);
      })();
    },
    [id, reset]
  );

  const onSubmit = (data) => {
    handleEdit(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && errors.name.type === "required" && (
          <small className="form-text text-danger">
            Phải nhập tên sản phẩm
          </small>
        )}
      </div>

      <div className="form-group mb-3">
        <label>Price</label>
        <input
          type="text"
          className="form-control"
          {...register("price", {
            required: true,
            validate: (value) => !isNaN(value),
          })}
        />
        {errors.price && errors.price.type === "required" && (
          <small className="form-text text-danger">
            Phải nhập giá sản phẩm
          </small>
        )}
        {errors.price && errors.price.type === "validate" && (
          <small className="form-text text-danger">Phải là số</small>
        )}
      </div>

      <div className="form-group mb-3">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          {...register("description")}
        />
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ProductEdit;
