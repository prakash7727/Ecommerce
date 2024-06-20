import { useEffect, useState } from "react";
import Jumbotrom from "../cards/Jumbotrom";
import axios from "axios";
import moment from "moment";
import ProductCard from "../cards/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] =useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(()=> {
    if(page === 1) return;
    loadMore();
  },[page])

  const getTotal = async() => {
    try {
      const { data} = await axios.get("/product-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  }
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-product/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/list-product/${page}`);
      setProducts([...products,...data]);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  return (
    <>
      <div>
        <Jumbotrom
          title="Hello world"
          subTitle="welcome to my e-commerce app"
        />
        <div className="row">
          <div className="col-md-6">
            <h2 className="p-3 mt-2 h4 bg-light text-center"> New arrivals</h2>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="p-3 mt-2 h4 bg-light text-center"> Best sellars</h2>
            <div className="row">
              {sortedBySold?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container text-center p-5">
       {products && products.length < total && (
        <button className="btn btn-warning btn-lg col-md-6" onClick={(e) =>{ e.preventDefault()
          setPage(page + 1)}
        } disabled={loading}>{loading ? "Loading" : "Load more"}</button>
       )}
        </div>
      </div>
    </>
  );
}
export default Home;
