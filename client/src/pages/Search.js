import Jumbotrom from "../cards/Jumbotrom";
import ProductCard from "../cards/ProductCard";
import { useSearch } from "../context/Search"

export default function Serach(){

      const [values, setValues] = useSearch();

      return(
            <>
            <Jumbotrom title="Search Results" subTitle={values?.results?.length < 1 ? "No oroducts found" : `found ${values?.results?.length} products`}/>
            <div className="container mt-3">
                  <div className="row">
                        {values?.results?.map((p) => (
                              <div className="col-md-4" key={p._id}>
                                    <ProductCard p={p}/>
                              </div>
                        ))}
                  </div>
            </div>
            </>
      )
}