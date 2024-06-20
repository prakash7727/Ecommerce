import { Badge } from "antd";
import axios from "axios";
import {
  PiCheckBold,
  PiClockBold,
  PiCurrencyInrBold,
  PiGitMergeBold,
  PiRocketBold,
  PiTimer,
  PiWarehouseBold,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import moment from "moment";
import ProductCard from "../cards/ProductCard";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";

export default function ProductView() {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([])

  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadReleted(data._id, data.category._id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadReleted = async(productId, categoryId) => {
      try{
      const { data} = await axios.get(`/related-products/${productId}/${categoryId}`);
      setRelated(data);
      } catch(err){
            console.log(err)
      }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="card mb-3 lead">
              <Badge.Ribbon text={`${product?.sold} sold`} color="red">
                <Badge.Ribbon
                  placement="start"
                  color="green"
                  text={`${
                    product?.quantity >= 1
                      ? `${product?.quantity - product?.sold} In stock`
                      : "Out of stock"
                  }`}
                >
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                    alt="img"
                    style={{
                      height: "400px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </Badge.Ribbon>
              <div className="card-body">
                <h1 className="fw-bold">{product.name}</h1>
                <p className="card-text">{product?.description}</p>
              </div>
              <div className="d-flex justify-between lead p-5 bg-light fw-bold">
                <div>
                  <p>
                    <PiCurrencyInrBold /> Price:{" "}
                    {product?.price?.toLocaleString("en-us", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p>
                    <PiGitMergeBold />
                    Category: {product?.category?.name}
                  </p>
                  <p>
                    <PiClockBold /> Added: {moment(product.createdAt).fromNow()}
                  </p>
                  <p>
                    {product?.quantity > 0 ? <PiCheckBold /> : <PiTimer />}
                    {product?.quantity > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <p>
                    <PiWarehouseBold /> Available :{" "}
                    {product?.quantity - product?.sold}
                  </p>
                  <p>
                    <PiRocketBold /> Sold : {product?.sold}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-outline-primary col card-button"
                style={{ borderBottomRightRadius: "5px" }} onClick={()=> {setCart([...cart, product]); localStorage.setItem("cart", JSON.stringify([...cart, product])); toast.success("Added to cart")}}
              >
                Add to cart
              </button> 
            </div>
          </div>
          <div className="col-md-3">
            <h2>Related Products</h2>
            <hr/>
           {related?.length < 1 && <p>Nothing found</p>}
           {related?.map((p) => (<ProductCard p={p} key={p._id}/>))}
          </div>
        </div>
      </div>
    </>
  );
}
