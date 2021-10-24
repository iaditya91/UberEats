/* eslint-disable */
export function createCart(payload) {
    return { type: 'CREATE_CART', payload };
  }
  
export function addDishToCart(payload) {
    return { type: 'ADD_TO_CART', payload };
  }
  
export function updateDishQuantity(payload) {
    return { type: 'UPADATE_DISH_QUANTITY', payload };
  }

export function addRestaurantDetailsToCart(payload) {
    return { type: 'ADD_RESTAURANT_DETAILS_TO_CART', payload };
  }

export function resetCart() {
    return { type: 'RESET_CART'};
  }

export function setCartReduxFromDB(payload) {
    return { type: 'SET_CART_FROM_DB', payload};
  }