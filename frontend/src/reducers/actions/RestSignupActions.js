export function signupRestaurantRequest() {
  return { type: 'SIGNUP_RESTAURANT_REQUEST' };
}

export function signupRestaurantSuccess(payload) {
  return { type: 'SIGNUP_RESTAURANT_SUCCESS', payload };
}

export function signupRestaurantFailure(payload) {
  return { type: 'SIGNUP_RESTAURANT_ERROR', payload };
}
