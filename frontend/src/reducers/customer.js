const initialState = {
  token: '',
  error: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_CUSTOMER_REQUEST':
      return state;
    case 'LOGIN_CUSTOMER_SUCCESS':
      return { ...state, error: '', token: action.payload.data.token };
    case 'LOGIN_CUSTOMER_FAILURE':
      return { ...state, error: action.payload.data.error, token: '' };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default customerReducer;
