import React, { Component } from 'react';
import $ from 'jquery'
import AddTextarea from '../AddTextarea/AddTextarea';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import {Grid, Row, Col, Navbar} from 'react-bootstrap';
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import FormButton from './FormButton';


var divStyle = {
  //color: 'white',
  //backgroundImage: 'url(' + imgUrl + ')',
  //WebkitTransition: 'all', // note the capital 'W' here
  //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
  border: '1px solid black',
  padding: '21px 35px',
  margin: '31px auto',
  width: '90%',
};
class AddQuestion extends Component {
	constructor() {
		super();
		this.state={
			isAddingQuestion: false,
			questions:[],
			questions_count:0,
			quesid_anstype:{},
			add_form: false,
			form_details: {} 
		}
		this.addQuestionText = this.addQuestionText.bind(this);
		this.selectValue = this.selectValue.bind(this);
		this.onInputTextUpdate = this.onInputTextUpdate.bind(this);
		this.createNewForm = this.createNewForm.bind(this);
		this.saveFormDetails = this.saveFormDetails.bind(this);
		this.submit = this.submit.bind(this);
	}
	componentDidMount() {

		//first fetch the form id from local storage.
		//if the form id exists, then make a get request to server to fetch form details from this ID
		//AJAX call, get the response
		
			// this.setState({
			// 	questions: response.questions,

			// 	form_details: response.form_details,
			// });
		

		this.setState({
			add_form:true 
		})
	}
	addQuestionText() {
		const questions = this.state.questions.concat(AddTextarea);

		this.setState({ 
			isAddingQuestion: true,
			questions: questions,
		});
	}

	selectValue(event, index) {
		// console.log(event.target.value);
		// console.log(event.target.name);
		var previous_quesid_anstype = this.state.quesid_anstype;

		if(!previous_quesid_anstype[index])
				previous_quesid_anstype[index] ={}

		if(event.target.id === 'question-text') {
     	previous_quesid_anstype[index]["question"] = event.target.value; 
		}
		else if(event.target.id === 'answerTypeSelect') {
			previous_quesid_anstype[index]["answer_type"] = event.target.value
			if(!previous_quesid_anstype[index]["options"])
			{
				previous_quesid_anstype[index]["options"] = {0:""}
			}
		}
		this.setState({
				quesid_anstype: previous_quesid_anstype
		})
	}

	onInputTextUpdate(value, index, position){
		var quesid_anstype = this.state.quesid_anstype;
		quesid_anstype[index]["options"][position] =value

		this.setState({
				quesid_anstype: quesid_anstype
		})

	}
	saveFormDetails(event) {
		console.log(event.target.value);
		let form_details = this.state.form_details;
		if(event.target.id === "title") {
			form_details['title'] = event.target.value;
		}
		else if(event.target.id === "description") {
			form_details['description'] = event.target.value;
		}

		//Here, save the form ID inside local storage
		this.setState({
			form_details: form_details
		});

		// var title = this.state.form_details.title,
		// description = this.state.form_details.description;
		//  axios.post('http://localhost:3000/form', {
  //    	title:title,
  //    	description: description
  //   	}).then(function(response){
  //    	console.log(response);
  //  		 }).catch(function(error){
  //   	console.log(error);
    // });
		// axios(
  //    { 
  //    	method: 'POST', 
  //     url: 'http://localhost:3000/form', 
  //     headers: { "Content-Type":"application/x-www-form-urlencoded"},
  //     {
  //   		title: "1234599999999",
  //   		description:"this won't work either. Lol"
  // 			}
  //   	}).then(function (response) {
  //   		console.log(response);
  // 		})
  // 		.catch(function (error) {
  //   		console.log(error);
  // 		});
		// // function sendPostRequest(url, type, data, callback){
		// // 	console.log(data)
		// // 		$.ajax({
		// // 		   url: url,
		// // 		   data: data,
		// // 		   error: function(err) {
		// // 		      console.log(err)
		// // 		   },
		// // 		   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		// // 		   dataType: 'json',
		// // 		   success: function(data) {
		// // 		   		console.log("Request successful")
		// // 		   		callback(data)
		// // 		   },
		// // 		   type: type
		// // 		});
		// // }



		// sendPostRequest("http://localhost:3000/form", "POST", this.state.form_details, function(response){
		// 	console.log(response);
		// });
	}
	submit() {
		 axios.post('http://localhost:3000/form', {
     	title:"title  testing schema",
     	form_description: "form_description"
    	}).then(function(response){
     	console.log(response);
   		 }).catch(function(error){
    	console.log(error);
    }	);
	}
	createNewForm(event) {
		this.setState({
			add_form: true
		});

	}

	render() {
		console.log("this.state.quesid_anstype", this.state.quesid_anstype)
		const  isAddingQuestion  = this.state;

		const questions = this.state.questions.map((AddTextar, index) => {
			let answer_type;
			if(this.state.quesid_anstype[index] && this.state.quesid_anstype[index]["answer_type"])
			{
				answer_type = this.state.quesid_anstype[index]["answer_type"]
			}

			let question_type = this.state.quesid_anstype[index]? this.state.quesid_anstype[index] :""

  		return <AddTextarea key={ index } index={ index } answer_type={answer_type} 
  				onInputTextUpdate={this.onInputTextUpdate}
  				question_anstype={question_type} 
  				selectValue ={this.selectValue} />	
    });
    	
		return(
			<div>
				
					{this.state.add_form === false ? 

					<FormButton createNewForm={this.createNewForm} />: 
					
					<div className="container" style={{border: "1px solid black", height: "100%"}}>

				 			<div>Question Builder: Product Feedback</div>

				 			<textarea className="textarea-style" id="title" type="text" name="question-title" rows="2" cols="50" 
						  placeholder="Form Title" onBlur={this.saveFormDetails}/>
							
							<textarea className="textarea-style" id="description" type="text" name="question-description" rows="2" cols="50" 
							placeholder="Please write the description as well." onBlur={this.saveFormDetails}/>	
							
							<div>
							 { isAddingQuestion && questions }
							</div>
							
							<button className="alert alert-primary" onClick={this.addQuestionText}>AddQuestion</button>

							<button className="alert alert-primary" onClick={this.submit} style={{float:"right"}}>Publish</button>
					</div>
				}
				
			</div>
			
		)
	}
}

export default AddQuestion;