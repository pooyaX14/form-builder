import React, { Component } from 'react';
import AddTextarea from '../AddTextarea/AddTextarea';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import {Grid, Row, Col, Navbar} from 'react-bootstrap';
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios';
//import FormButton from './FormButton';
import { Link } from 'react-router-dom';
// import Pagination from "react-js-pagination";
var shortid = require('shortid');
// import "../../node_modules/bootstrap3/dist/css/bootstrap.min.css";

// var divStyle = {
//   //color: 'white',
//   //backgroundImage: 'url(' + imgUrl + ')',
//   //WebkitTransition: 'all', // note the capital 'W' here
//   //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
//   border: '1px solid black',
//   padding: '21px 35px',
//   margin: '31px auto',
//   width: '90%',
// };
class AddQuestion extends Component {
	constructor() {
		super();
		this.state={
			isAddingQuestion: false,
			questions_count:0,
			//form_questions_details:{},
			form_questions_details:[],
			add_form: false,
			form_details: {},
			form_url:"",
			form_data_response:[],
			activePage: 15,
			questionId: ""
		}
		this.addQuestionText = this.addQuestionText.bind(this);
		this.selectValue = this.selectValue.bind(this);
		this.onInputTextUpdate = this.onInputTextUpdate.bind(this);
		this.createNewForm = this.createNewForm.bind(this);
		// this.saveFormDetails = this.saveFormDetails.bind(this);
		this.submit = this.submit.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);

		this.deleteQuestion = this.deleteQuestion.bind(this);
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
		// const questions = this.state.questions.concat({});
		var questions_count = this.state.questions_count;
		questions_count++


		this.setState({ 
			isAddingQuestion: true,
			// questions: questions,
			questions_count: questions_count,
		});
	}

	deleteQuestion(index) {
		console.log("index is now", index);
		// if(deleteTextArea !== "") {
			var form_questions_details = this.state.form_questions_details;
			var questions_count = this.state.questions_count
			form_questions_details.splice(index, 1);
			questions_count--


			this.setState({
	      		form_questions_details: form_questions_details,
	      		questions_count: questions_count
	    	}, () => {
	    		this.forceUpdate();
	    	});

	    	
		// }
	}

	selectValue(event, index) {
		var form_questions_details = this.state.form_questions_details;
		console.log("selectValue"+index)
		//console.log(form_questions_details[index]);

		if(form_questions_details[index] === undefined){
				var map = {}
				var textArea = document.getElementById("question-text-"+index);
				map = {
						content: textArea.value,
						content_type: "question",
						options: {0:null},
						answer_type: event.target.value,
						id: shortid.generate()
				};
				form_questions_details.push(map)
				console.log("inside if", form_questions_details)
		}else{
				form_questions_details[index]["answer_type"] = event.target.value;
		}
		
		
		 
		// if(!previous_quesid_anstype[index])
		// 		previous_quesid_anstype[index] ={}

		// if(event.target.id === 'question-text') {
  //    	previous_quesid_anstype[index]["question"] = event.target.value; 
		// }
		// else if(event.target.id === 'answerTypeSelect') {
		// 	previous_quesid_anstype[index]["answer_type"] = event.target.value
		// 	if(!previous_quesid_anstype[index]["options"])
		// 	{
		// 		previous_quesid_anstype[index]["options"] = {0:""}
		// 	}
		// }
		// console.log("previous_quesid_anstype", previous_quesid_anstype)
		this.setState({
			form_questions_details: form_questions_details
		})
	}

	onInputTextUpdate(value, index, position){
		var form_questions_details = this.state.form_questions_details;
		// here I am putting the values from the options textarea to form_questions_details object-> 
		//form_questions_details[0]["options"][0] =value, form_questions_details[1]["options"][1] =value
		form_questions_details[index]["options"][position] =value

		this.setState({
			form_questions_details: form_questions_details
		})

	}
	// saveFormDetails(event) {
	// 	// console.log(event.target.value);
	// 	let form_details = this.state.form_details;
	// 	if(event.target.id === "title") {
	// 		form_details['title'] = event.target.value;
	// 	}
	// 	else if(event.target.id === "description") {
	// 		form_details['description'] = event.target.value;
	// 	}

	// 	//Here, save the form ID inside local storage
	// 	this.setState({
	// 		form_details: form_details
	// 	});
		
	// }
	submit() {
			var form_title = document.getElementById("title").value;
			var form_description = document.getElementById("description").value;
			var that = this;
			if(this.state.form_questions_details.length > 0) {
				axios.post('http://localhost:3000/form', {
	     			form_title: form_title,
	     			form_description: form_description,
	     			questions: this.state.form_questions_details

	    	}).then(function(response){
	     			console.log(response.data._id); //formId
	     			let formId= response.data._id;
	     			let form_url = window.location.href+formId;
	     			//console.log(form_url)
	     			that.setState({
	     				form_url:form_url,
	     				form_data_response: response
	     			})
	     			console.log(form_url)
	   		}).catch(function(error){
	    			console.log(error);
	    	});		
	   }
	   else {
	   	//show some message
	   }
	}
	createNewForm(event) {
		this.setState({
			add_form: true
		});

	}
	// deleteQuestion(form_question_details, deleteTextArea) {
	// 	console.log("deleteQuestin is triggered", deleteTextArea);
	// 	const form_questions_details = form_questions_details;
	// 	console.log("form_questions_details", form_questions_details)
	// 	if(deleteTextArea !== "") {
	// 		const updated_form_list = form_questions_details.splice(deleteTextArea, 1);
	// 		this.setState({
	//       form_questions_details:updated_form_list
	//     })		
	// 	}
	// }
	handlePageChange(pageNumber) {
    	console.log(`active page is ${pageNumber}`);
    	this.setState({activePage: pageNumber});
  	}
	render() {

		var {isAddingQuestion, form_data_response}  = this.state;

		var AddTextareaElements = []

		for(var index = 0; index < this.state.questions_count; index++){
			let answer_type;
			if(this.state.form_questions_details[index] && this.state.form_questions_details[index]["answer_type"])
			{
				answer_type = this.state.form_questions_details[index]["answer_type"]
			}
			//var id = shortid.generate();
			var question_type;
			if(this.state.form_questions_details[index]){
				question_type = this.state.form_questions_details[index]
				console.log("question_type inside if addquestion", question_type);
			}else{
				question_type = {
					id: shortid.generate()
				}
				console.log("question_type inside if addquestion", question_type);
			}
			//let question_type = this.state.form_questions_details[index]? this.state.form_questions_details[index] : {id: id}
			
			
			
			AddTextareaElements.push(<AddTextarea key={ question_type.id } id={question_type.id} index={ index } answer_type={answer_type} 
  				onInputTextUpdate={this.onInputTextUpdate}
  				question_anstype={question_type} 
  				selectValue ={this.selectValue} deleteQuestion={this.deleteQuestion} />)
		}


	    if(this.state.form_url.length !== 0) {
	    	let url="http://localhost:3001/form/"+form_data_response.data._id;
				return (
					<div>
						<h4>Your form has been submitted. You can now share this URL to get responses!</h4>
						<h5><Link to={`/form/${form_data_response.data._id}`}>{url}</Link></h5>
					</div>
				)
			}
	    	
			return(
				<div>
						<div className="container" style={{border: "1px solid black", height: "100%"}}>

					 			<div>Question Builder: Product Feedback</div>
					 			
					 			<textarea className="textarea-style" id="title" type="text" name="question-title" rows="2" cols="50" 
							  placeholder="Form Title" />
								
								<textarea className="textarea-style" id="description" type="text" name="question-description" rows="2" cols="50" 
								placeholder="Please write the description as well."/>	
								
								<div>
								 { isAddingQuestion && AddTextareaElements }
								</div>
								
								<button className="alert alert-primary" onClick={this.addQuestionText}>AddQuestion</button>
								<button className="alert alert-primary" onClick={this.submit} style={{float:"right"}}>Publish</button>
								{/*<button className="alert alert-primary" onClick={this.deleteQuestion>Delete</button>*/}
						</div>		
				</div>
				
			)
		}
}

export default AddQuestion;