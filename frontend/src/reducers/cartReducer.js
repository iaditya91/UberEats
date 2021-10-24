/* eslint-disable */
const initialState = {
    cartId: '',
    custId: '',
    dishes: [],
    restaurant: '',
  };
 
 export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CART_FROM_DB':
            return {
                cartId: action.payload.cartItems._id,
                custId: action.payload.cartItems.custId._id,
                dishes: action.payload.cartItems.dishes,
                restaurant: action.payload.cartItems.restId,
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
        case 'ADD_TO_CART':
            return {
                ...state,
                dishes: [...state.dishes, {dish: action.payload.dishId, quantity: action.payload.quantity}]
            };
        case 'UPADATE_DISH_QUANTITY':
            let alldishes = state.dishes
            if(action.payload.quantity<=0){
                for(let i=0;i<state.dishes.length;i++){
                    if(state.dishes[i].dish.dishId==action.payload.dishId.dishId){
                        alldishes.splice(i, 1)
                    }
                }
            }
            
            else{
                for(let i=0;i<state.dishes.length;i++){
                    if(state.dishes[i].dish.dishId==action.payload.dishId.dishId){
                        alldishes[i].quantity= action.payload.quantity
                    }
                }
            }
            console.log(alldishes)
            return {
                ...state,
                dishes: alldishes
            };
        default:
            return state;
    }
  };