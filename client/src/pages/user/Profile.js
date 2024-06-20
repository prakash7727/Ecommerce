import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import UserMenu from "../../components/nav/nav/userMenu.js";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    try {
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });

      if(data?.error) {
        toast.error(data.error) 
      } else {
        setAuth({...auth, user: data});
        //local stroge 
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("User Profile updated")

      }
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="User Profile"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
            <form onSubmit={handleSubmit}>
              <input 
              className="form-control m-2 p-2"
              placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
              <input 
              className="form-control m-2 p-2"
              placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />
              <input 
              className="form-control m-2 p-2"
              placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <textarea 
              className="form-control m-2 p-2"
              placeholder="Enter your address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-primary m-2 p-2" type="submit">submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
