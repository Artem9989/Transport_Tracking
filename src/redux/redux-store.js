import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import authReducer from './Auth-reducer';
import thunkMiddleware from 'redux-thunk';
import driversReducer from './Driver-reducer'
import appReducer from './App-reducer';
import adminAuthReducer from './AuthAdmin-reducer'
import registerReducer from './Register-reducer'
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
  adminAuth: adminAuthReducer,
  auth: authReducer,
  registerPage: registerReducer,
  form: formReducer,
  app: appReducer,
  DriversPage: driversReducer,
  
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)
  ));
window.store = store;

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;