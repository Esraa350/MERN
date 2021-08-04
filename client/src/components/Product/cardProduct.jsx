import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../css/card.css";
const Card = (props) => {
  const userId = useSelector((state) => state.id);
  var history = useHistory();
  const [data, setData] = useState([]);

  async function fetchData() {
    const productAPI = "/product";

    await axios.get(productAPI).then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  var classname = "fa fa-heart fa-3x";
  const addTouser = async (product) => {
    let productId = product._id;
    const watchListApi = "/watchList/" + userId + "/product";
  return await axios.post(watchListApi,{productId})
    .then((response) => {
      toast.dark(response);
    })
    .catch(function (error) {
        toast.error(`${error}`);
        history.push("/login");
      }
    // let data=Promise.all(res);
    )
}

  return (
    <>
    <button
        onClick={() => history.push("/productsForm/new")}
        className="col-2 btn btn-primary m-2 float-end"
      >
        Add Product
      </button>
    <ToastContainer />
    
      {data.map((product) => (
        <div key={product._id} className="col-3 mt-4">
          <div className="card cardproduct rounded shadow overflow-hidden p-3 mb-5">
            <img
              src={product.productImage}
              className="card-img img"
              alt="..."
            />
            
            <div className="card-body">
              <i onClick={() => addTouser(product)} className={classname}></i>

              <span>{product.name}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
