import React, { Component } from 'react';

class FormButton extends Component {
	render() {
		return(
			<button className="alert alert-primary" onClick={this.props.createNewForm}>Create New Form</button>
		)
	}
}

export default FormButton;