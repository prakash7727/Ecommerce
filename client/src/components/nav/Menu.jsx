/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  //hooks
  const categories = useCategory();
  //console.log(categories)
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            HOME
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>
        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Categories
            </a>
            <ul className="dropdown-menu" style={{ maxHeight: "100vh" }}>
              <NavLink className="nav-link" to="/categories">
                All Categories
              </NavLink>
              {categories?.map((c) => (
                <li className="nav-item" key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>
        <li className="nav-item">
          <Badge count={cart?.length >= 1 ? cart.length : 0} offset={[-5, 12]} showZero={true}>
            <NavLink className="nav-link" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>
        <Search />
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link pointer">
                    LOGOUT
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
export default Menu;
