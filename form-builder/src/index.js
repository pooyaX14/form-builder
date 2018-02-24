import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AddQuestion from './AddQuestion/AddQuestion'
import registerServiceWorker from './registerServiceWorker';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
//import ResponsePage from './ResponsePage/ResponsePage';
import ResponsePageTest from './ResponsePageTest/ResponsePageTest.js';

ReactDOM.render(
	<BrowserRouter>	
		<Switch>		
			<Route path="/" exact render={(props) => <AddQuestion {...props}/>}></Route>
			<Route path="/form/:number" exact render={(props) => <ResponsePageTest {...props}/>}></Route>

		</Switch>
	</BrowserRouter>, document.getElementById('root')
)
// ReactDOM.render(
// 	<Router history={browserHistory} routes={routes}/>,
//  	document.getElementById('root')
// );


// registerServiceWorker();

// ReactDOM.render(<AddQuestion />, document.getElementById('root'));
// registerServiceWorker();

// /* eslint-disable no-console */
// import React from 'react';
// import 'babel-polyfill';
// import {render} from 'react-dom';
// import { Router, browserHistory } from 'react-router';
// import routes from './routes';
// import './styles/style.css'; // webpack can css files too
// import '../node_modules/bootstrap/dist/css/bootstrap.css';

// render(
// 	<Router history={browserHistory} routes={routes} />,
// 	document.getElementById('app')
// );
