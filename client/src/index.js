import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AddQuestion from './AddQuestion/AddQuestion'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ResponsePageTest from './ResponsePageTest/ResponsePageTest.js';

ReactDOM.render(
	<BrowserRouter>	
		<Switch>		
			<Route path="/" exact render={(props) => <AddQuestion {...props}/>}></Route>
			<Route path="/form/:number" exact render={(props) => <ResponsePageTest {...props}/>}></Route>

		</Switch>
	</BrowserRouter>, document.getElementById('root')
)
