import { useState } from "react";
import Jumbotrom from "../cards/Jumbotrom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useLocation, useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("pk@gmail.com");
  const [password, setPassword] = useState("1234567");

  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  //console.log(process.env.REACT_APP_API)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${window.location.origin}/api/login`, {
        email,password
      })
      console.log(data)
      if(data?.error) {
        toast.error(data.error)
      } else { 
        localStorage.setItem("auth", JSON.stringify(data))
        setAuth({...auth, token:data, user: data.user})
        toast.success("Login successfull")
        navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.")
    }
  };
  return (
    <>
      <div>
        <Jumbotrom title="Login" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
