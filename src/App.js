import React from 'react';
import './main.css';
import Map from './components/FirstWindow';
import AuthenticationWindow from './components/AuthenticationWindow';
import { Switch, BrowserRouter as Router, Redirect, withRouter } from 'react-router-dom';
import NotFound from './components/NotFound'
import { createBrowserHistory } from 'history';
import { connect,Provider } from 'react-redux';
import { compose } from 'redux';
import store from './redux/redux-store.js'
import { initializeApp } from './redux/App-reducer';
import Preloader from './components/Common/Preloader/Preloader';


export const history = createBrowserHistory();


const App = (props) => {
	if (props.initialized) {
		return <Preloader />
	  }
	return (
		<>
				<Switch>
					<AuthenticationWindow path='/login' />
					<Map path='/main' />
					<Redirect from="*" to="/login" />
					<NotFound path="*" component={NotFound} />
				</Switch>
		</>
	);
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
  })
  
  let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
  
  const TransportTracking = (props) => {
	return <Router>
	  <Provider store={store}>
		<AppContainer />
	  </Provider>
	  </Router>
  }
  
  export default TransportTracking;
