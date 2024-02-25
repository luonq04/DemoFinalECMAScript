import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProductList({ products, handleDelete }) {
  const { isAuth } = useAuth();
  console.log(isAuth);

  return (
    <>
      <div className="d-flex mb-4 justify-content-between">
        <h3>List Product</h3>
        <Link to="/products/add" className="btn btn-success">
          Add Product
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((pro, index) => (
            <tr key={pro.id}>
              <td>{index}</td>
              <td>{pro.name}</td>
              <td>{pro.price}</td>
              <td>{pro.description}</td>
              <td className="d-flex gap-3">
                <Link to={`/products/${pro.id}/edit`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(pro.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;
