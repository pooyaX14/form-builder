import React, { Component } from 'react';
import './index.css';
import * as choices from './constant'; 
import RadioButton from '../RadioButton/RadioButton';
import CheckboxButton from '../CheckboxButton/CheckboxButton';
import ParagraphAnswer from '../ParagraphAnswer/ParagraphAnswer';
import DropdownOptions from '../DropdownOptions/DropdownOptions';
import DropdownButton from '../DropdownButton/DropdownButton';

class AddTextarea extends Component {
	constructor() {
			super();
			this.saveQuestion = this.saveQuestion.bind(this);
			this.get_answer_type_element = this.get_answer_type_element.bind(this);
			this.onAddButtonClick = this.onAddButtonClick.bind(this);
			//this.deleteTextArea = this.deleteTextArea.bind(this);
			// this.state={
			// 	defaultValue: "what's your name?",
			// 	radioButtonarr: [],
			// 	showRadioButton: false,
			// }
		}
	// componentWillReceiveProps(nextProps) {
	// 	this.setState({
	// 		index: nextProps.index,
	// 		answer_type: nextProps.answer_type
	// 	})
 //    // /ReactDOM.findDOMNode(this.refs.msg).value = ""
	// }

	saveQuestion(event) {
			console.log(event.target.value);
	}

	onAddButtonClick(value,index,position){
			this.setState({
				needAddAnotherbutton: true,
		})
		//this.props.onInputTextUpdate(value,index,position)
		this.props.onInputTextUpdate("",index,position+1)
	}
	get_answer_type_element() {

		let element = [];
		if(this.props.answer_type === choices.MULTIPLE_CHOICE)
	  	{
			if(this.props.question_anstype)
			{
				let options = this.props.question_anstype["options"]
				//console.log("options inside get_answer_type_element", options)
				var i=0;
				let options_length = Object.keys(options).length;
				for(var answer in options)
				{		
						let needAddAnotherbutton = (i === options_length-1);
						let textValue = options[answer]
						element.push(<RadioButton index={this.props.index} onInputTextUpdate={this.props.onInputTextUpdate}
						 position= {i} key={i} textValue={textValue} onAddButtonClick={this.onAddButtonClick}
						 needAddAnotherbutton={needAddAnotherbutton}/>)
						i++;
				}
			}
		}
		else if(this.props.answer_type === choices.CHECKBOXES) {
			if(this.props.answer_type) {
				let checkboxOptions = this.props.question_anstype["options"]
				i=0;
				let checkbox_options_length = Object.keys(checkboxOptions).length;
				for(var answer in checkboxOptions)
				{
						let needAddAnotherbutton = i === checkbox_options_length-1 ;
						element.push(<CheckboxButton index={this.props.index} onInputTextUpdate={this.props.onInputTextUpdate}
						 position= {i} key={i} onAddButtonClick={this.onAddButtonClick}
						 needAddAnotherbutton={needAddAnotherbutton}/>)
						i++;
				}
			}	
		}
		else if(this.props.answer_type === choices.PARAGRAPH) {
			if(this.props.answer_type) {
				// here position is always 0 because we will have only one paragraph for one Question
				element.push(<ParagraphAnswer index={this.props.index} 
					                          onInputTextUpdate={this.props.onInputTextUpdate} 
											  key={0} position={0}/> )
			}	
		}
		else if(this.props.answer_type === choices.DROPDOWN) {
			let dropdownButton = "";
			if(this.props.answer_type) {
				let options = this.props.question_anstype["options"]
				var i=0;
				let options_length = Object.keys(options).length;
				for(var answer in options)
				{		
						let needAddAnotherbutton = (i === options_length-1);
						let textValue = options[answer]
						element.push(<DropdownOptions index={this.props.index} onInputTextUpdate={this.props.onInputTextUpdate}
						 position= {i} key={i} textValue={textValue} onAddButtonClick={this.onAddButtonClick}
						 needAddAnotherbutton={needAddAnotherbutton} />)
						i++;
				}
				dropdownButton = <DropdownButton options={options}/>
			}
			element = <div><ol>{element}</ol>{dropdownButton}</div>	
			//element = <ol>{element}</ol>;
		}
		

		return <div>{element}</div>;
}
	render() {
		//console.log("this.state.form_questions_details",this.state.form_questions_details);
		var index = this.props.index;
		var answer_type_element = this.props.answer_type? this.get_answer_type_element(): ""

		return(

			<div style={{"borderTop": "1px solid black"}} id={this.props.id}>
				{/*<textarea className="textarea-style" type="text" id={"question-text-"+index} rows="2" cols="50" 
					placeholder="Please enter your question." onBlur={(e)=>this.props.selectValue(e, index)} style={{ display: 'inline-block'}}/>
*/}		<div>

			<textarea className="textarea-style" type="text" id={"question-text-"+index} rows="2" cols="50" 
					placeholder="Please enter your question." style={{ display: 'inline-block'}} defaultValue={this.props.question_anstype.content}/>
				<div className="dropdown" style={{display: 'inline-block',top: '-50px',left: '51px', width:'30%'}}>

				  <select className="custom-select" id="answerTypeSelect" onChange={(e)=>this.props.selectValue(e, index)}>
				    <option defaultValue>Choose...</option>
				    <option value={choices.MULTIPLE_CHOICE}>Mutilple Choice</option>
				    <option value={choices.CHECKBOXES}>Checkboxes</option>
				    <option value={choices.PARAGRAPH}>Paragraph</option>
				    <option value={choices.DROPDOWN}>Dropdown</option>
				  </select>
				</div>

				{answer_type_element}
			
			</div>
		{/*	<DeleteButton onClick={() => this.deleteTextArea(index)}/>*/}
			<button className="alert alert-primary" 
				onClick={() => this.props.deleteQuestion(index)}>Delete</button>
			</div>
		)
	}
}

export default AddTextarea;