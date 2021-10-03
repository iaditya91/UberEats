export function signupCustomerRequest() {
  return { type: 'SIGNUP_CUSTOMER_REQUEST' };
}

export function signupCustomerSuccess(payload) {
  return { type: 'SIGNUP_CUSTOMER_SUCCESS', payload };
}

export function signupCustomerFailure(payload) {
  return { type: 'SIGNUP_CUSTOMER_ERROR', payload };
}
