
import { useNavigate } from "react-router-dom";
import Jumbotrom from "../cards/Jumbotrom";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import UserCartSidebar from "../cards/UserCartSidebar";
import ProductCartHorizantal from "../cards/ProductCartHorizontal";

export default function Cart() {
  //context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  //hooks
  const navigate = useNavigate();


  
  return (
    <>
      <Jumbotrom
        title={`hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart?.length} items in the cart. ${
                auth?.token ? "" : `Please login to chechout`
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-4 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continus shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                 <ProductCartHorizantal p={p} index={index} />
                ))}
              </div>
            </div>
            <UserCartSidebar/>
          </div>
        </div>
      )}
    </>
  );
}
