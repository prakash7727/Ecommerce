import { useEffect, useState } from "react";
import Jumbotrom from "../cards/Jumbotrom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../cards/ProductCard";

export default function CategoryView() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductByCategory();
  }, [params?.slug]);

  const loadProductByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Jumbotrom
        title={category?.name}
        subTitle={`${products?.length} products found in "${category?.name}"`}
      />
      <div className="container-fluid">
            <div className="row mt-3">
                  {products?.map((p) => (
                        <div className="col-md-4" key={p._id}>
                              <ProductCard p={p}/>
                        </div>
                  ))}
            </div>
      </div>
    </>
  );
}
