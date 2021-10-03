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

function App() {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login/restaurant" component={LoginRestaurant} />
          <Route path="/login/customer" component={LoginCustomer} />
          <Route path="/register/customer" component={CustomerSignup} />
          <Route path="/register/restaurant" component={RestaurantSignup} />
          <Route path="/restaurants/update" component={RestaurantUpdate} />
          <Route path="/restaurantMain" component={RestaurantMain} />
          <Route path="/restaurants" component={Restaurants} />          
          <Route path="/customers" component={RestaurantSignup} />
          <Route path="/media" component={MediaUploader} />
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
