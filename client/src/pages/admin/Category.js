import Jumbotrom from "../../cards/Jumbotrom";
import { useAuth } from "../../context/auth.js";
import AdminMenu from "../../components/nav/nav/AdminMenu.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/forms/CategoryForm.js";
import toast from "react-hot-toast";

export default function AdminCategory() {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdatename] = useState("");
  const [select, setSelect] = useState(null);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        setName("");
        loadCategories();
        toast.success(`"${data.name}" is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data} = await axios.put(`/category/${select._id}`, {
        name:updateName
      });
      if(data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        toast.success(`"${data.name}" is updated`);
        setSelect(null)
        setUpdatename("")
        setVisible(false)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data} = await axios.delete(`/category/${select._id}`);
      if(data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        toast.success(`"${data.name}" is deleted`);
        setSelect(null)
        setVisible(false)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Jumbotrom
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      ></Jumbotrom>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Category</div>
            <div className="p-3">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <hr />
            <div className="col">
              {categories?.map((c) => (
                <button
                  className="btn btn-outline-primary m-3"
                  key={c._id}
                  onClick={() => {
                    setVisible(true);
                    setSelect(c);
                    setUpdatename(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updateName}
                setValue={setUpdatename}
                buttonText="update"
                handleDelete={handleDelete}
              />
            </Modal>
            
          </div>
        </div>
      </div>
    </>
  );
}
