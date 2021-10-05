/* eslint-disable */
const initialState = {
    addresses:[]
  };
 
 export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DELIVARY_ADDRESS':
            return action.payload.address;
        case 'ADD_DELIVARY_ADDRESS':
            return {
                addresses: [...state.addresses, action.payload.address]
            }
        default:
            return state;
    }
  };