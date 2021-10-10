/* eslint-disable */
import { combineReducers } from 'redux';
import customerReducer from './customer';
import restaurantReducer from './restaurant';
import customerSignupReducer from './signupReducer';
import restaurantSignupReducer from './ResSignupReducer';
import cartReducer from './cartReducer';
import favReducer from './favReducer';
import orderReducer from './orderReducer';
import detReducer from './detReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
  restaurant: restaurantReducer,
  RestSignupActions: restaurantSignupReducer,
  signupActions: customerSignupReducer,
  cart: cartReducer,
  order: orderReducer,
  favourite: favReducer,
  details: detReducer,
  search: searchReducer,
});

export default rootReducer;
