/* eslint-disable jsx-a11y/img-redundant-alt */
import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import AdminMenu from "../../components/nav/nav/AdminMenu.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const {Option} = Select;

export default function AdminProduct() {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShiping] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
      //console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async(e)=> {
    e.preventDefault(e);
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      const { data} = await axios.post("/product", productData);
      //console.log(data)
      if(data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`"${data.name}" is created`);
        navigate('/dashboard/admin/products')
      }
     } catch (err) {
      console.log(err)
      toast.error("Product create failed. Try again")
    }
  }


  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
           <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Product</div>
            {photo && <div className="text-center">
              <img src={URL.createObjectURL(photo)} alt="product photo" className="img img-responsive" height="200px"/></div>}
            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name :  "Upload photo"}
              <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden/>
              </label>
            </div>
            <input type="text" className="form-control mb-3" placeholder="Write a name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea type="text" className="form-control mb-3" placeholder="Write a description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" className="form-control mb-3" placeholder="Enter a price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" className="form-control mb-3" placeholder="Enter a quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <Select variant="false" className="form-select mb-3" size="large" placeholder="choose categories" showSearch onChange={(value)=> setCategory(value)}>
              {categories?.map((c) => <Option key={c._id} value={c._id} >{c.name}</Option>)}
            </Select>
            <Select variant="false" className="form-select mb-3" size="large" placeholder="choose shipping" onChange={(value)=> setShiping(value)}>
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
