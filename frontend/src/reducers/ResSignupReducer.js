const initialState = {
  token: '',
  error: '',
  rest: {},
};
const restaurantSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_RESTAURANT_REQUEST':
      return state;
    case 'SIGNUP_RESTAURANT_SUCCESS':
      return {
        ...state,
        error: '',
        token: action.payload.data.token,
        rest: action.payload.data.rest,
      };
    case 'SIGNUP_RESTAURANT_ERROR':
      return { ...state, error: action.payload.data.error, token: '' };
    default:
      return state;
  }
};

export default restaurantSignupReducer;
