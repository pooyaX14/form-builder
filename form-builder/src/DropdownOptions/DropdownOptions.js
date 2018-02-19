import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DropdownOptions extends Component {
	constructor() {
		super();
		this.state={
			inputTextValue: ""
		}
		this.onInputTextChangeValue = this.onInputTextChangeValue.bind(this);
	}
	onInputTextChangeValue(event) {
		let value = event.target.value;
		if(value === this.state.inputTextValue)
			return value;
		this.setState({
			inputTextValue: value,
		})
	 this.props.onInputTextUpdate(value,this.props.index,this.props.position)
	 // this.props.onInputTextUpdate("1233",this.props.index,this.props.position+1)
	}
	render() {
		let needAddAnotherbutton = this.props.needAddAnotherbutton;
		return(
		
					
		  <li style={{"marginBottom": "22px"}}>
		  	<input type="text" placeholder="Option1" onBlur={(e)=>this.onInputTextChangeValue(e)}/>
			  {needAddAnotherbutton ? 
			  	<button className="btn btn-primary btn-sm" style ={{marginLeft:"15px"}}
	    		onClick={()=>this.props.onAddButtonClick(this.state.inputTextValue,this.props.index,this.props.position)}>
		  		Add Other
		  	</button>
	   		:""}
		  </li>
	
    	
    )
	}	
}

export default DropdownOptions;