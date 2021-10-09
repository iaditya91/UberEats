/* eslint-disable */
const initialState = {
    customer:[],
    restaurant:[]
  };
 
 export default function detReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CUSTOMER_DETAILS':
            return {
                ...state,
                customer: action.payload.customer
            }
        case 'SET_RESTAURANT_DETAILS':
            return {
                ...state,
                restaurant: action.payload.restaurant
            }
        default:
            return state;
    }
  };