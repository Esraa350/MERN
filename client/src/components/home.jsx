import React from "react";
import { Link} from "react-router-dom";
import "./css/Form.css";
import Card from "./Product/cardProduct";
const Home = () => {
  return (
    <>
      {/* <img src="img/online-shopping-2691810-2231675.png" alt="spaceship" /> */}
      <hr></hr>
      
        <div className="row">
            <div class="col-12 shadow p-3 mb-5 bg-white rounded">
              <Link className="col-6"
                className="btn-lg "
              >
                <i class="fas fa-user mx-2"></i>
                user Profile
              </Link>
              <Link to="/watchList" className="col-6"
                className="btn-lg "
              >
                <i class="far fa-eye mx-2"></i>
                watch list
              </Link>
            </div>
          </div>
          <div className="row">
          <Card/>
          </div>
          
    </>
  );
};

export default Home;
