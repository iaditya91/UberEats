/* eslint-disable */
const initialState = {
    cartId: '',
    custId: '',
    dishes: [],
    restaurant: '',
    orderNote: '',
  };

const eventExists = (events, event) => {
    return events.dishes.some((e) => e.dish._id === event);
}
 
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CART_FROM_DB':
            return  {
                cartId: action.cartData._id,
                custId: action.cartData.custId._id,
                dishes: action.cartData.dishes,
                restaurant: action.cartData.restId,
            }
        case 'CREATE_CART':
            return {
                ...state,
                custId: action.payload.custId
            }
        case 'ADD_RESTAURANT_DETAILS_TO_CART':
                return {
                    ...state,
                    restaurant: action.payload.restaurant
                };
        case 'RESET_CART':
            return {
                ...state,
                dishes: [],
                restaurant: {}
            };
        case 'RESET_AND_ADD_TO_CART':
                return {
                    custId: action.payload.custId,
                    dishes: [{dish: action.payload.dishId, quantity: action.payload.quantity}],
                    restaurant: action.payload.restaurant,
                    orderNote: '',
                    cartId: ''
                };
        case 'ADD_TO_CART':
            if (eventExists(state, action.payload.dishId._id)) {
                return state;
            } else{
                return {
                    ...state,
                    dishes: [...state.dishes, {dish: action.payload.dishId, quantity: action.payload.quantity}]}
                }
        case 'UPADATE_DISH_QUANTITY':
            let alldishes = state.dishes
            if(action.payload.quantity<=0){
                for(let i=0;i<state.dishes.length;i++){
                    if(state.dishes[i].dish._id==action.payload.dishId._id){
                        alldishes.splice(i, 1)
                    }
                }
            }    
            else{
                for(let i=0;i<state.dishes.length;i++){
                    if(state.dishes[i].dish._id==action.payload.dishId._id){
                        alldishes[i].quantity= action.payload.quantity
                    }
                }
            }
            return {
                ...state,
                dishes: alldishes
            };
        default:
            return state;
    }
  };


  export default cartReducer;