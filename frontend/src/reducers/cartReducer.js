/* eslint-disable */
const initialState = {
    custId: '',
    dishes:[]
  };
 
 export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_CART':
            return {
                ...state,
                custId: action.payload.custId
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                dishes: [...state.dishes, action.payload.dishId]
            };
        default:
            return state;
    }
  };