import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ProductAdd({ handleAdd }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleAdd(data);
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

export default ProductAdd;
