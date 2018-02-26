import React, { Component } from 'react';

// const Message = ({chat, question}) => 
	
// 		(
//     <li className={`chat ${question === chat.question ? "left" : "right"}`}>
//         {chat.question}
//     </li>
// );
class Message extends Component {
	render() {
		const {quiz_item, type} = this.props;
		return(
			<li className={`chat ${type === "question" ? "left" : "right"}`}>
				{quiz_item.content}
			</li>
		)
	}
}

export default Message;

