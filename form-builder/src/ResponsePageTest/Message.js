import React from 'react';

// const Message = ({chat, question}) => 
	
// 		(
//     <li className={`chat ${question === chat.question ? "left" : "right"}`}>
//         {chat.question}
//     </li>
// );
const Message = (chat, question) => 
		(
    <li className={`chat ${question === chat.question ? "left" : "right"}`}>
        {chat.question}
    </li>
);

export default Message;