import React, {
    Component
} from 'react';

import './ResponsePageTest.css';

class ResponseArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer_type: "Paragraph",
            options_object: {},
            answer: "",
            isChecked: false,
            selectedCheckboxes: []

        }
        this.saveSelection = this.saveSelection.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);

    }
    componentWillReceiveProps(nextProps){
    	var inputChoices = [];
    	// for(let option_key in nextProps.options_object){
    	// 	inputChoices.push(nextProps.options_object[option_key])
    	// }

    	console.log("responseArea")
    	this.setState({
    		answer_type: nextProps.answer_type,
    		options_object: nextProps.options_object,
    		answer: "",
    	});

    }
    componentDidMount(){
    	this.setState({
    		answer_type: this.props.answer_type,
    		options_object: this.props.options_object,
    	});
    }
    toggleCheckbox(e) {
    	var selectedCheckboxes = this.state.selectedCheckboxes;
    	var index = selectedCheckboxes.indexOf(e.target.value)
        if (index === -1) {
          selectedCheckboxes.push(e.target.value);

        } else {
        	selectedCheckboxes.splice(index, 1);
        }

        this.setState({
        	selectedCheckboxes: selectedCheckboxes
        });

    }
    saveSelection(e){
    	e.preventDefault();
    	if(this.state.answer_type === "Paragraph"){
    		var paragraphInput = document.getElementById("responseInput");
    		this.props.submitMessage(paragraphInput.value, this.state.answer_type);
    		paragraphInput.value = ""

    	}else if(this.state.answer_type === "MultipleChoice"){
    		var inputs = document.getElementsByName('responseInput');
    		var answer = "";
    		for(var i = 0; i < inputs.length; i++) {
    		    if(inputs[i].checked == true) {
    		        answer = inputs[i].value;
    		        break;
    		    }
    		}
    		this.props.submitMessage(answer, this.state.answer_type);


    	}else if(this.state.answer_type === "Checkboxes"){
    		var inputs = document.getElementsByName('checkboxResponseInput');
    		var answer = "";
    		for(var i = 0; i < inputs.length; i++) {
    		    if(inputs[i].checked == true) {
    		    	answer = answer + " " + inputs[i].value;
    		    }
    		}

    		this.props.submitMessage(answer, this.state.answer_type);
    	}

    	//save in state variable answer
    	//call function of parent component submitMessage()
    }

    handleChange(event){
    	console.log(event.target.checked)
    	if(event.target.checked === true){
    		console.log("inside if")
    		event.target.checked = true
    	}else{
    		event.target.checked = false
    	}
    }

    render() {
    	var responseArea = [];
    	var answer_type = this.state.answer_type;

    	if(answer_type === "Paragraph"){

    		responseArea = <input type="text" id="responseInput"/>
    	
    	}else if(answer_type === "MultipleChoice"){

    		var options_object = this.state.options_object;

    		for(let option_key in options_object) {
    			responseArea.push(
    				<div key={option_key}>
	                    <label>
	                    	<input type="radio" name="responseInput" value={options_object[option_key]} defaultChecked={false}/>
	                    	{options_object[option_key]}
	                    </label>
	                </div>
    			)
    		}

    	}else if(answer_type === "Checkboxes"){
    		var options_object = this.state.options_object;
    		var selectedCheckboxes = this.state.selectedCheckboxes;
    		var isChecked = false;
    		for(let option_key in options_object) {
    			
    			if(selectedCheckboxes.indexOf(options_object[option_key]) !== -1){
    				isChecked = true
    			}else{
    				isChecked = false
    			}

    			responseArea.push(
    				<div key={option_key}>
	                    <label>
	                    	<input type="checkbox" name="checkboxResponseInput" value={options_object[option_key]} onChange={this.toggleCheckbox} checked={isChecked}/>
	                    	{options_object[option_key]}
	                    </label>
	                </div>
    			)

    		}   		
    	}
    	return (
    		<form className="input" onSubmit={(e) => this.saveSelection(e)}>
    			{responseArea}
    			<input type="submit"  value="Send"/>
            </form>
    	)
    	
    }
}

export default ResponseArea