import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Joi from "joi-browser";
import axios from "axios";
import "../css/Form.css";
import { Link,useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [values, setValues] = useState({
    username: "",
    mobile: "",
    dateofbirth:"",
    password: "",
    errors: {},
  });
  const now = Date.now();
  var history = useHistory();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));
  const schema = {
    username: Joi.string().required(),
    mobile: Joi.string().required(),
    dateofbirth:Joi.date().max(cutoffDate).required(),
    password: Joi.string().required(),
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (errors === null) {
      let obj = { ...values };
      console.log(obj);
      return await axios
        .post("user/register", obj)
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          toast.dark("logged");
          history.push("/login"); //to forward in home page after login
        })
        .catch(function (error) {
          if (error.response) {
            // let message=error.response.errors;
            toast.error(`${error.response.data.error}`);
            // console.log();
            console.log(error.response);
            console.log(error.response.headers);
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
      [name]: value,
    });
  };
  
  return (
    <>
      <div className="form-content-right">
        <ToastContainer />
        <form className="form" onSubmit={handleSubmit}>
          <h1>
            SignUp
            <hr></hr>
          </h1>
          <div className="form-inputs">
            <label className="form-label" htmlFor="username">
              username
            </label>
            <input
              className="form-input"
              value={values.username}
              onChange={handelChange}
              autoFocus
              name="username"
              id="username"
              type="text"
            />
            {values.errors.username && (
              <div className="alert alert-danger">{values.errors.username}</div>
            )}
          </div>
          <div className="form-inputs">
            <label className="form-label" htmlFor="mobile">
              mobile
            </label>
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
              <div className="alert alert-danger">{values.errors.mobile}</div>
            )}
          </div>
          <div className="form-inputs">
            <label className="form-label" htmlFor="dateofbirth">
            Date Of Birth
            </label>
            <input
              className="form-input"
              value={values.dateofbirth}
              onChange={handelChange}
              autoFocus
              name="dateofbirth"
              id="dateofbirth"
              type="date"
            />
            {values.errors.dateofbirth && (
              <div className="alert alert-danger">{values.errors.dateofbirth}</div>
            )}
          </div>
          <div className="form-inputs">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              value={values.password}
              onChange={handelChange}
              name="password"
              id="password"
              type="password"
            />
            {values.errors.password && (
              <div className="alert alert-danger">{values.errors.password}</div>
            )}
          </div>
          <button type="submit" className="form-input-btn">
            SignUp
          </button>
          <span className="form-input-login">
            Already have an account? Login<Link to="/login">here</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default SignUp;
