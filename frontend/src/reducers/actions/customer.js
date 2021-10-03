/* eslint-disable */
export function loginCustomerRequest() {
  return { type: 'LOGIN_CUSTOMER_REQUEST' };
}

export function loginCustomerSuccess(payload) {
  return { type: 'LOGIN_CUSTOMER_SUCCESS', payload };
}

export function loginCustomerFailure(payload) {
  return { type: 'LOGIN_CUSTOMER_ERROR', payload };
}

export function logoutCustomer(){
  return { type: 'LOGOUT'};
}

