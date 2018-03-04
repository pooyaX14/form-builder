import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class ParagraphAnswer extends Component {
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
			return value;
		this.setState({
			inputTextValue: value,
		})
	 this.props.onInputTextUpdate(value,this.props.index,0)
	}
	render() {
		return(
			<div style={{"marginBottom": "22px"}}>
				<textarea className="textarea-style" type="text" id="long-paragraph" rows="2" cols="50" 
						placeholder="Long Answer..."
						onBlur={(e)=>this.onInputTextChangeValue(e)} 
						style={{ display: 'inline-block'}}/>

    		</div>
		)
	}	
}

export default ParagraphAnswer;