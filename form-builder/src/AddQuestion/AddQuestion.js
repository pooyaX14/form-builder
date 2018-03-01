import React, { Component } from 'react';
import AddTextarea from '../AddTextarea/AddTextarea';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var shortid = require('shortid');

class AddQuestion extends Component {
	constructor() {
		super();
		this.state={
			isAddingQuestion: false,
			questions_count:0,
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
		this.submit = this.submit.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);
	}
	// set state true when one clicks on 'Add Question' button
	componentDidMount() {
		this.setState({
			add_form:true 
		})
	}
	addQuestionText() {
		var questions_count = this.state.questions_count;
		questions_count++

		this.setState({ 
			isAddingQuestion: true,
			questions_count: questions_count,
		});
	}

	deleteQuestion(index) {
			var form_questions_details = this.state.form_questions_details;
			var questions_count = this.state.questions_count;
			form_questions_details.splice(index, 1);
			questions_count--;

			this.setState({
	      		form_questions_details: form_questions_details,
	      		questions_count: questions_count
	    	}, () => {
	    		this.forceUpdate();
	    	});
	}

	selectValue(event, index) {
		var form_questions_details = this.state.form_questions_details;

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
		}
		else{
				form_questions_details[index]["answer_type"] = event.target.value;
		}

		this.setState({
			form_questions_details: form_questions_details
		})
	}

	onInputTextUpdate(value, index, position){
		var form_questions_details = this.state.form_questions_details;
		form_questions_details[index]["options"][position] =value /*I am putting the values from the options textarea to form_questions_details Object-> 
			 example-> 
					form_questions_details[0]["options"][0] =value, 
					form_questions_details[1]["options"][1] =value
		*/

		this.setState({
			form_questions_details: form_questions_details
		})

	}
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
	     			let formId= response.data._id;
	     			let form_url = window.location.href+formId;
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
	
	render() {

		var {isAddingQuestion, form_data_response}  = this.state;

		var AddTextareaElements = []

		for(var index = 0; index < this.state.questions_count; index++){
			let answer_type;
			if(this.state.form_questions_details[index] && this.state.form_questions_details[index]["answer_type"])
			{
				answer_type = this.state.form_questions_details[index]["answer_type"]
			}
			var question_type;
			if(this.state.form_questions_details[index]){

				question_type = this.state.form_questions_details[index]
			}
			else{
				question_type = {
					id: shortid.generate()
				}
				
			}
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

						</div>		
				</div>
				
			)
		}
}

export default AddQuestion;