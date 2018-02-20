import React, { Component } from 'react';
import axios from 'axios';
import './ResponsePageTest.css';
import Chatroom from './Chatroom';

class ResponsePageTest extends Component {
		constructor(props) {
			super(props);
			this.state={
				dummydata:[],
			  questionNumber:-1
			}
		}
	componentDidMount() {
		console.log("componentDidMount is rendered")
		axios.get('http://localhost:3000/dummydata').then((response) => {
     	var data = response.data.json_data;
     	console.log("response is", data);
     	if(Object.keys(data).length > 0) {
     		this.setState({
     			questionNumber:0
     		})
     	}
			this.setState({
				dummydata: data
			})
   		 }).catch(function(error){
    		console.log(error);
    }	);
	}
	render() {
		return(
			<div className="App">
        <Chatroom chathistory={this.state.dummydata} questionNumber={this.state.questionNumber}/>
      </div>
		)
	}
}

export default ResponsePageTest;