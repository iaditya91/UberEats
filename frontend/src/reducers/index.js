import { combineReducers } from 'redux';
import customerReducer from './customer';
import restaurantReducer from './restaurant';
import customerSignupReducer from './signupReducer';
import restaurantSignupReducer from './ResSignupReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
  restaurant: restaurantReducer,
  RestSignupActions: restaurantSignupReducer,
  signupActions: customerSignupReducer,
});

export default rootReducer;
