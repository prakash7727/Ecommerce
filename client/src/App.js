import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//import 'antd/dist/antd.css';
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Menu from "./components/nav/Menu";
import DashBoard from "./pages/user/Dashboard";
import PrivateRoute from "./components/nav/routes/PrivateRoute";
import AdminDashBoard from "./pages/admin/Dashboard";
import AdminRoute from "./components/nav/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminProductsUpdate from "./pages/admin/ProductUpdate";
import Shop from "./pages/Shop";
import Serach from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Orders";


const PageNotFound = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        404 | Page not found
      </div>
    </>
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Serach />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/product/:slug" element={<ProductView />} />
          <Route path="/category/:slug" element={<CategoryView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<DashBoard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders/>} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashBoard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/product/update/:slug" element={<AdminProductsUpdate />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
