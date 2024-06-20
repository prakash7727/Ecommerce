
import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import AdminMenu from "../../components/nav/nav/AdminMenu.js";

export default function AdminDashBoard() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
           <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Information</div>
            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
              <li className="list-group-item">Admin</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
