const initialState = {
  token: '',
  error: '',
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_RESTAURANT_REQUEST':
      return state;
    case 'LOGIN_RESTAURANT_SUCCESS':
      return { ...state, error: '', token: action.payload.data.token };
    case 'LOGIN_RESTAURNAT_FAILURE':
      return { ...state, error: action.payload.data.error, token: '' };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default restaurantReducer;
