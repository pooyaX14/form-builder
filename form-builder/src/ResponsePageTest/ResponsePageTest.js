import React, { Component } from 'react';
import axios from 'axios';
import './ResponsePageTest.css';
import Chatroom from './Chatroom';

class ResponsePageTest extends Component {
		constructor(props) {
			super(props);
			this.state={
				form_data:{},
				questions: [],
			  questionNumber:-1
			}
		}
	componentDidMount() {
		console.log("componentDidMount is rendered")
		let response_url = window.location.href;
		console.log(response_url);
		response_url = response_url.replace("3001", 3000)
		
		axios.get(response_url).then((response) => {
			console.log(response)
     	// var data = response.data.
     	if(Object.keys(response.data).length > 0) {
     		this.setState({
     			questionNumber:0
     		})
     	}
     	console.log()
			this.setState({
				form_data: response.data,
				questions: response.data.questions
			})
   		 }).catch(function(error){
    		console.log(error);
    }	);
	}
	render() {
		return(
		<div className="App">
        	<Chatroom form_data={this.state.form_data} questions={this.state.questions}/>
    	</div>
		)
	}
}

export default ResponsePageTest;