import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from "react";
import './styles.css'
import Login from "./components/Login/Login";
import Home from './components/Products/Home';
import AddProduct from './components/Products/AddProduct';
import History from './components/History';
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import ProductDetails from './components/Products/ProductDetails';
import UpdateProduct from './components/Products/UpdateProduct';

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
              <Route exact path="/SmartSuper-Market/Home/:id/:product_name">
              <ProductDetails/>
              </Route>
              <Route exact path="/SmartSuper-Market/update/:id/:product_name">
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