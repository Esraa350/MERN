import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../css/card.css";
const WatchList = (props) => {
  const userId = useSelector((state) => state.id);
  const userName=useSelector((state) => state.name)
  var history = useHistory();
  const [data, setData] = useState([]);

async function fetchData() {
    const watchListApi = "/watchList/"+userId ;
    await axios.get(watchListApi).then((res) => {
        setData(res.data.ProductIDs);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const deleteFomUser=async(product)=>{
    let productId=product._id;
    const watchListApi = "/watchList/" + userId ;
    return await axios.post(watchListApi,{productId})
    .then((response) => {
      toast.dark(response);
      history.push("/home");
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
    <ToastContainer />
    <h1>{userName}</h1>
      {data.map((product) => (
        <div key={product._id} className="col-3 mt-4">
          <div className="watchList watchListproduct rounded shadow overflow-hidden p-3 mb-5">
            <img
              src={product.productImage}
              className="watchList-img img"
              alt="..."
            />
            <div className="card-body">
              <i onClick={() => deleteFomUser(product)} className="fas fa-trash-alt"></i>

              <span>{product.name}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WatchList;
