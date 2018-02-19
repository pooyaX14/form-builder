import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class RadioButton extends Component {
	constructor() {
		super();
		this.state={
			inputTextValue: ""
		}
		this.onInputTextChangeValue = this.onInputTextChangeValue.bind(this)
	}
	onInputTextChangeValue(event) {
		let value = event.target.value;
		if(value === this.state.inputTextValue)
			return;
		this.setState({
			inputTextValue: value,
		})
		if(this.props.resetneedAddAnotherbutton)
	 this.props.resetneedAddAnotherbutton()
	 this.props.onInputTextUpdate(value,this.props.index,this.props.position)
	}
	render() {
		let needAddAnotherbutton = this.props.needAddAnotherbutton
		return(
			<div style={{"marginBottom": "22px"}}>
				<input type="radio" id="contactChoice1" name="contact" value="ischecked"/>
    			<input type="text" placeholder="Option1" onBlur={(e)=>this.onInputTextChangeValue(e)}/>
    		{needAddAnotherbutton ? <button className="btn btn-primary btn-sm" 
    		onClick={()=>this.props.onAddButtonClick(this.state.inputTextValue,this.props.index,this.props.position)} >Add Other</button> :""}
    	</div>
		)
	}	
}

export default RadioButton;