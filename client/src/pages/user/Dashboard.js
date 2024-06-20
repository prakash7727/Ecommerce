import { NavLink } from "react-router-dom";
import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import UserMenu from "../../components/nav/nav/userMenu.js";

export default function UserDashBoard() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="User Dashboard"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
           <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">User Information</div>
            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
