/* eslint-disable */
export function loginRestaurantRequest() {
  return { type: 'LOGIN_RESTAURANT_REQUEST' };
}

export function loginRestaurantSuccess(payload) {
  return { type: 'LOGIN_RESTAURANT_SUCCESS', payload };
}

export function loginRestaurantFailure(payload) {
  return { type: 'LOGIN_RESTAURANT_ERROR', payload };
}

export function logoutRestaurant(){
  return { type: 'LOGOUT'};
}
