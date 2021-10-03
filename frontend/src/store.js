import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const thunkMiddleware = require('redux-thunk').default;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;
