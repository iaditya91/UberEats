/* eslint-disable */
const initialState = {
    searchquery:""
};
 
 export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return action.payload.searchquery;
        default:
            return state;
    }
  };