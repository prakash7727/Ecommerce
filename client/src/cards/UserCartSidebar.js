import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";


export default function UserCartSidebar() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    getClientToken();
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleBuy = async() => {
    try {
      setLoading(true)
      const { nonce} = await instance.requestPaymentMethod();
      const { data} = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      console.log(data)
      setLoading(false)
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment successfull")
      
    } catch(err) {
      console.log(err)
      setLoading(false)
    }

  }
  return (
    <>
      <div className="col-md-4">
        <h4>Your cart summary</h4>
        Total / Address / payment
        <hr />
        <h6>Total: {cartTotal()}</h6>
        {auth?.user?.address ? (
          <>
            <div className="mb-3">
              <hr />
              <h4>Address:</h4>
              <h5>{auth?.user?.address}</h5>
            </div>
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          </>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Add delivery address
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                Login to chechout
              </button>
            )}
          </div>
        )}
        <div>
         {!clientToken || !cart?.length ? '' : <>
         <DropIn options={{
          authorization: clientToken,
          paypal: {
            flow: "valut",
          }
         }}
         onInstance={(instance) => setInstance(instance)}
         />
         <button onClick={handleBuy} className="btn btn-primary col-12 mt-2" disabled={!auth?.user?.address || !instance || loading}>{loading ? "Processing..." : "Buy" }</button>
         </>}
        </div>
      </div>
    </>
  );
}
