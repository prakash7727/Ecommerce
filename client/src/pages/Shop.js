import { useEffect, useState } from "react";
import Jumbotrom from "../cards/Jumbotrom";
import axios from "axios";
import ProductCard from "../cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "./Prices";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([])


  useEffect(() => {
     if(!checked.length || !radio.length) loadProduct();
    }, []);

  useEffect(() => {
    if(checked.length || radio.length) loadFiltredProducts();
  },[checked, radio]);

const loadFiltredProducts = async() => {
      try{
       const {data} = await axios.post("/filltered-products", {checked, radio});
       console.log("filtred products =>", data)
       setProducts(data);
      } catch(err) {
            console.log(err)
      }
}

  const loadProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChecked= (value, id) => {
       let all = [...checked];
       if(value) {
            all.push(id);
       } else {
            all =  all.filter((c) => c !== id);
       }
       setChecked(all);
  }
  return (
    <>
      <Jumbotrom title="Hello world" subTitle="welcome to React E-commerce" />
      <div className="container-fluid">

        <div className="row p-5">
          <div className="col-md-3">
            <h2 className="p-3 mt-4 mb-2 h4 bg-light text-center">
              Filtter by categories..
            </h2>
            <div className="row">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleChecked(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h2 className="p-3 mt-4 mb-2 h4 bg-light text-center">
              Filtter by prices..
            </h2>
            <div className="row">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {prices?.map((p) =>(<div key={p._id} style={{marginLeft:"8px"}}>
                        <Radio value={p.array}> {p.name}</Radio>
                  </div>) )}
              </Radio.Group>
            </div>
            <div className="p-5 pt-5">
                  <button className="btn btn-outline-secondary col-12" onClick={()=> window.location.reload()}>Reset</button>
            </div>
          </div>

          <div className="col-md-9">
            <h2 className="p-3 mt-4 mb-2 h4 bg-light text-center">
              {products?.length} Products
            </h2>
            <div className="row" style={{height:"80vh", overflow:"scroll"}}>
              {products.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
