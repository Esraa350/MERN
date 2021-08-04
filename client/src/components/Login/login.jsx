import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Joi from "joi-browser";
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from "../../store/action";
import "../css/Form.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  const dispatch=useDispatch();
  const [values, setValues] = useState({
    mobile: '',
    password: '',
    errors: {},

  });

  const schema = {
         mobile: Joi.string().required(),
         password: Joi.string().required(),
       };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    
    if (errors === null) {
      let obj = { ...values, username: "Esraa" };
      
      return await axios
        .post("user/login", obj)
        .then((response) => {
          dispatch(login(response.data));
          toast.dark("logged");
          props.history.replace("/home");//to forward in home page after login
        })
        .catch(function (error) {
          if (error.response) {

            // let message=error.response.errors;
            toast.error(`${error.response.data.error}`);
            // console.log()
          }
        });
    } else {
      return;
    }
  };
   const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
 const validate = () => {
    const errors = {};
    const state = { ...values };
    delete state.errors;
    const res = Joi.validate(state, schema, { abortEarly: false });
    if (!res.error) {
      setValues({ errors: {} });
      return null;
    } else {
      for (const error of res.error.details) {
        errors[error.path] = error.message;
      }
    }
    //set State
    setValues({ errors });
  };


  return (  
    <>
        <div className="form-content-right">
          <ToastContainer />
          <form className="form" onSubmit={handleSubmit}>
            <h1>
              Login
              <hr></hr>
            </h1>
            <div className="form-inputs">
              <label className='form-label' htmlFor="mobile">mobile</label>
              <input
                className="form-input"
                value={values.mobile}
                onChange={handelChange}
                autoFocus
                name="mobile"
                id="mobile"
                type="text"
                
              />
              {values.errors.mobile && (
                <div className="alert alert-danger">
                  {values.errors.mobile}
                </div>
              )}
            </div>
            <div className="form-inputs">
              <label className='form-label' htmlFor="password">Password</label>
              <input
                className="form-input"
                value={values.password}
                onChange={handelChange}
                name="password"
                id="password"
                type="password"
                
              />
              {values.errors.password && (
                <div className="alert alert-danger">
                  {values.errors.password}
                </div>
              )}
            </div>
            <button type="submit" className="form-input-btn">
              Login
            </button>
            <span className='form-input-login'>
                Already have an account? Sign Up<Link to='/signUp'>here</Link>
              </span> 
          </form>
        </div>
      </>
  );
}
 
export default Login;
