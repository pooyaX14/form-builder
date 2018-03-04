import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DropdownButton extends Component {
	render() {
		let options = this.props.options;
		let option_element = [];
		for(var option_key in options) {
			 option_element.push(<option key={option_key} value={options[option_key]}>{options[option_key]}</option>)
		}
		return(
			<select className="custom-select dropdown" id="DropdownButton">
				{option_element}
			</select>
		)
	}	
}

export default DropdownButton;