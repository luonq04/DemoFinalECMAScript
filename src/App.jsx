import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import { toast } from "react-toastify";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import AppLayout from "./AppLayout";
import Signin from "./Signin";
import Signup from "./Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedPage from "./ProtectedPage";

function App() {
  const [products, setProducts] = useState([]);
  const URL = "http://localhost:3000/products";

  useEffect(() => {
    (async function getProduct() {
      const { data } = await axios.get(URL);
      setProducts(data);
    })();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm("Bạn chắc chắn muốn xóa ???");

    if (confirm) {
      await axios.delete(`${URL}/${id}`);
      const newListProducts = products.filter((pro) => pro.id !== id);
      setProducts(newListProducts);
      toast.success("Xóa thành công");
    }
  }

  async function handleAdd(product) {
    const { data } = await axios.post(URL, product);
    console.log(data);
    toast.success("Thêm thành công !!!");
    setProducts([...products, data]);
  }

  async function handleEdit(product) {
    const { data } = await axios.put(`${URL}/${product.id}`, product);
    console.log(data);
    toast.success("Sửa thành công !!!");
    setProducts(products.map((pro) => (pro.id === product.id ? product : pro)));
  }

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <AppLayout />
            </ProtectedPage>
          }
        >
          <Route
            index
            element={
              <ProductList products={products} handleDelete={handleDelete} />
            }
          />
          <Route
            path="/products/add"
            element={<ProductAdd handleAdd={handleAdd} />}
          />
          <Route
            path="/products/:id/edit"
            element={<ProductEdit handleEdit={handleEdit} />}
          />
        </Route>

        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
