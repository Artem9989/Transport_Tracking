import React from 'react';
import './main.css';
import FirstWindow from './components/FirstWindow';
import DriversContainer from './components/driver/driverContainer';
import AuthenticationWindow from './components/AuthenticationWindow';
import AllUsersContainer from './components/AdminPanel/AllUsersContainer'
import { Switch, BrowserRouter as Router, Redirect, withRouter, Route } from 'react-router-dom';
import NotFound from './components/NotFound'
import { createBrowserHistory } from 'history';
import { connect,Provider } from 'react-redux';
import { compose } from 'redux';
import store from './redux/redux-store.js'
import { initializeApp } from './redux/App-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import AdminAuthContainer from './components/AdminPanel/AdminAuthContainer';


export const history = createBrowserHistory();


const App = (props) => {

	if (props.initialized) {
		return <Preloader />
	  }


	return (
		<>

				<Switch>
					{/* {token &&   <Route path='/main' component={FirstWindow}/>}
          			{!token && <Route path='/login' component={AuthenticationWindow}/> }
					 */}
					 <Route path='/main' component={FirstWindow}/>
					<Route path='/admin' component={AdminAuthContainer} />
					<Route path='/adminPanel' component={AllUsersContainer} />
					
					<Route path='/login' component={AuthenticationWindow}/>
					<Route path="*" component={NotFound} />
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

  