import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import authReducer from './Auth-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './App-reducer';
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  app: appReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)
  ));
window.store = store;

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;