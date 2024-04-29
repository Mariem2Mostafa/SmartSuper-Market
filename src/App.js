import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from "react";
import './styles.css'
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import AddProduct from './components/AddProducts/AddProduct';
import History from './components/History/History';
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound'
import ProductDetails from './components/productDetails/ProductDetails';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';


const App = () => {
  return ( 
    <Router>
      <div className="content">
        <Switch>
          <Route exact path="/SmartSuper-Market">
            <Login/>
          </Route>
          <Route>
            <Navbar />
            <Switch>
              <Route exact path="/SmartSuper-Market/Home">
                <Home/>
              </Route>
              <Route exact path="/SmartSuper-Market/AddProduct">
                <AddProduct/>
              </Route>
              <Route exact path="/SmartSuper-Market/Home/:id">
              <ProductDetails/>
              </Route>
              <Route exact path="/SmartSuper-Market/update/:id">
                <UpdateProduct/>
              </Route>
              <Route exact path="/SmartSuper-Market/History">
                <History/>
              </Route>
              
              
              <Route exact path="*">
                <NotFound/>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;