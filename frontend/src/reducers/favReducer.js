/* eslint-disable */
const initialState = {
    favRestaurants:[]
  };
 
 export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_RESTAURANT_TO_FAVORITE':
            return {
                favRestaurants: [...state.favRestaurants, action.payload.favRestaurant]
            };
        default:
            return state;
    }
  };