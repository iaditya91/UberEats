/* eslint-disable */
import { combineReducers } from 'redux';
import customerReducer from './customer';
import restaurantReducer from './restaurant';
import customerSignupReducer from './signupReducer';
import restaurantSignupReducer from './ResSignupReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
  restaurant: restaurantReducer,
  RestSignupActions: restaurantSignupReducer,
  signupActions: customerSignupReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
