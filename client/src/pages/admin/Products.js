import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import AdminMenu from "../../components/nav/nav/AdminMenu.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  moment from "moment";

export default function AdminProducts() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Products</div>
            show all products for admin..
            {products?.map((p) => (
              <Link className="text-decoration-none"
                key={p._id}
                to={`/dashboard/admin/product/update/${p.slug}`}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body bb-0">
                        <h5 className="card-title">{p?.name}</h5>
                        <p className="card-text">{p?.description.substring(0, 160)}</p>
                        <p className="card-text">
                          <small className="text-muted">{moment(p.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
