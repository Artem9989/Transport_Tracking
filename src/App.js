import React from 'react';
import FirstWindow from './components/FirstWindow';
import AuthenticationWindow from './components/AuthenticationWindow';
import AllUsersContainer from './components/AdminPanel/AllUsersContainer'
import { Switch, HashRouter as Router,  withRouter, Route, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound'
import { createBrowserHistory } from 'history';
import { connect,Provider } from 'react-redux';
import { compose } from 'redux';
import store from './redux/redux-store.js'
import { initializeApp } from './redux/App-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import AdminAuthContainer from './components/AdminPanel/AdminAuthContainer';
// import './Styles/main.css'
// import './Styles/App.css'
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.dark.css';






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
					 <Route exact path='/main' component={FirstWindow}/>
					<Route exact path='/admin' component={AdminAuthContainer} />
					<Route exact path='/adminPanel' component={AllUsersContainer} />
					
					<Route exact path='/login' component={AuthenticationWindow}/>
					<Redirect from="*" to='/login' component={NotFound} />
				</Switch>
				{/* <Switch>
		
					 <Route exact path='/main' component={FirstWindow}/>
					<Route exact path='/admin' component={AdminAuthContainer} />
					<Route exact path='/adminPanel' component={AllUsersContainer} />
					
					<Route exact path='/login' component={AuthenticationWindow}/>
					<Redirect from="*" to='/login' component={NotFound} />
				</Switch> */}
				
		</>
	);
}



const mapStateToProps = (state) => ({
	initialized: state.app.initialized
  })
  
  let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
  
  const TransportTracking = (props) => {
	const history = createBrowserHistory();
	return <Router basemname={`/${process.env.PUBLIC_URL}`}>
	  <Provider store={store}>
		<AppContainer />
	  </Provider>
	  </Router>
  }
  
  export default TransportTracking;

  