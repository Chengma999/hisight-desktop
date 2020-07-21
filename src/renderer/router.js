import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/Login';
import Admin from './routes/Admin'
import requireAuth from './utils/requireAuth'
import AdminProducts from './components/admin/productscrud/AdminProducts.js'
import AdminOrders from './components/admin/order/Order.js'
import Overige from './components/admin/overige/overige.js'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Route path="/" exact component={LoginPage} />
        <Route path="/login" exact  component={LoginPage} />
        <Route  path="/admin" exact component={requireAuth(Admin)}/>
        <Route  path="/admin/products" exact component={requireAuth(AdminProducts)}/>
        <Route  path="/admin/orders" exact component={requireAuth(AdminOrders)}/>
        <Route  path="/admin/overige" exact component={requireAuth(Overige)}/>
      </div>
    </Router>
  );
}

export default RouterConfig;
