/* eslint-disable */
export function setCustomerDetails(payload) {
    return { type: 'CREATE_CART', payload };
  }
  
export function setRestaurantDetails(payload) {
    return { type: 'ADD_TO_CART', payload };
  }