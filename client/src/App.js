import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import NavBar from "./components/navbar";
import LoginForm from "./components/Login/mainLogin";
import signupForm from './components/SignUp/signupform';
import Home from "./components/home";
import ProductForm from './components/Product/productForm';
import WatchList from "./components/Product/watchList";
const App = () => {
  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
        <Route 
              path="/productsForm/:id"
              render={() => (
                <ProductForm
                  
                ></ProductForm>
              )}
            />
            <Route path="/WatchList" component={WatchList} />
          <Route path="/login" component={LoginForm} />
          <Route  path="/signUp" component={signupForm} />
          <Route  path="/home" render={(props) => <Home {...props}></Home> }/>
            <Redirect from="/" to="home" />
        </Switch>
      </main>
    </>
  );
};

export default App;
