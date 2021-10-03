const initialState = {
  token: '',
  error: '',
  cust: {},
};

const customerSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_CUSTOMER_REQUEST':
      return state;
    case 'SIGNUP_CUSTOMER_SUCCESS':
      return {
        ...state,
        error: '',
        token: action.payload.data.token,
        cust: action.payload.data.cust,
      };
    case 'SIGNUP_CUSTOMER_ERROR':
      return { ...state, error: action.payload.data.error, token: '' };
    default:
      return state;
  }
};

export default customerSignupReducer;
