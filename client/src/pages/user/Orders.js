
import { useAuth } from "../../context/auth.js";
import UserMenu from "../../components/nav/nav/userMenu.js";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"
import Jumbotrom from "../../cards/Jumbotrom.js";
import ProductCartHorizantal from "../../cards/ProductCartHorizontal.js";

export default function Orders() {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="User Orders"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            {orders?.map((o, i) => (
              <div key={o._id.$oid} className="border shadow bg-light rounded-4 mb-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col">#</th>
                      <th className="col">Status</th>
                      <th className="col">Buyer</th>
                      <th className="col">Ordered</th>
                      <th className="col">Payment</th>
                      <th className="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length} Products</td>
                    </tr>
                  </tbody>
                </table>
               <div className="container">
                <div className="row m-2">
                {o?.products?.map((p,i) => (
                  <ProductCartHorizantal key={i} p={p} remove={false}/>
                ))}
                </div>
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
