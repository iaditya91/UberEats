/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginCustomer from './pages/CustomerLogin';
import LoginRestaurant from './pages/RestaurantLogin';
import RestaurantSignup from './pages/RestaurantSignup';
import CustomerSignup from './pages/CustomerSignup';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaUploader from './components/MediaUploader';
import RestaurantUpdate from './pages/RestaurantUpdate';
import Restaurants from './pages/Restaurants';
import RestaurantMain from './pages/RestaurantMain';
import RestaurantAdmin from './pages/RestaurantAdmin';
import OrderCheckout from './pages/OrderCheckout';
import ViewRestaurantOrders from './pages/ViewRestaurantOrders';
import CustomerFavourtes from './pages/CustomerFavourtes';
import CustomerDashboard from './pages/CustomerDashboard';
import fileupload from './pages/fileupload';
import CustomerUpdate from './pages/CustomerUpdate';
import ViewOrders from './pages/ViewOrders';

function App() {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Switch>
          <Route exact path="/" component={CustomerDashboard} />
          <Route path="/login/restaurant" component={LoginRestaurant} />
          <Route path="/login/customer" component={LoginCustomer} />
          <Route path="/register/customer" component={CustomerSignup} />
          <Route path="/register/restaurant" component={RestaurantSignup} />
          <Route path="/restaurants/update" component={RestaurantUpdate} />
          <Route path="/customer/update" component={CustomerUpdate} />
          <Route path="/restaurantMain/:restId" component={RestaurantMain} />
          <Route path="/restaurantAdmin" component={RestaurantAdmin} />
          <Route path="/restaurants" component={Restaurants} />          
          <Route path="/customers" component={RestaurantSignup} />
          <Route path="/ordercheckout" component={OrderCheckout} />
          <Route path="/media" component={MediaUploader} />
          <Route path="/viewOrders" component={ViewOrders} />
          <Route path="/customerFavorites" component={CustomerFavourtes} />
          <Route path="/viewRestaurantOrders" component={ViewRestaurantOrders} />
          {/* <Route path="/customer/dashboard" component={CustomerDashboard} /> */}
          <Route path="/upload" component={fileupload} />
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
