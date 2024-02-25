import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./contexts/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(user) {
    try {
      const { data } = await axios.post("http://localhost:3000/signin", user);
      // localStorage.setItem("user", JSON.stringify(data));
      login(data);
      toast.success("Login thành công");
      setTimeout(function () {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      return toast.error("Login thất bại");
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h4 className="my-4">Đăng Nhập</h4>
        <Link to="/signup">Dang Ky</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <small className="form-text text-danger">Phải nhập email</small>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <small className="form-text text-danger">Phải nhập mật khẩu</small>
          )}
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
