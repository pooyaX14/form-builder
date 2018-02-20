import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './ResponsePageTest.css';
import Message from './Message';

class Chatroom extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	questionNumber=-1
		// }
		this.submitMessage = this.submitMessage.bind(this);
		//this.renderQuestion = this.renderQuestion.bind(this);
	}
	submitMessage(e) {
        e.preventDefault();
        /*this.setState({
            chats: this.props.chathistory.concat([{
                question: "this.props.chathistory.question",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });*/
    }
   // renderQuestion() {
   // 	let questionArray=[];
   // 	const questionNumber = this.props.questionNumber;
   // 	const chathistory = this.props.chathistory;
   // 	if(chathistory.length>0) {
	  //  	for(var i=0; i<questionNumber; i++) {
	  //  		console.log("renderQuestion is called")
	  //  		let question = chathistory[i].question;
	  //  		console.log("question is", question)
	  //  		questionArray.push(question);
	  //  		//return <Message questionArray={questionArray} question={question}/>
	  //  	}	
	  //  	return questionArray;  		
   // 	}
   // }
	
	render() {
		console.log("this.props.chathistory", this.props.chathistory);
		console.log("this.props.questionNumber", this.props.questionNumber);
    const { chathistory, questionNumber } = this.props;
    let element=[]
    let chathistoryLength = chathistory.length;
    if(chathistoryLength > 0) {

			for(var i=0; i<=(questionNumber); i++ ) {
				if(chathistoryLength <= 0) { break; }
				let index = chathistory[i]
				
				let question = index["question"]
				
				element.push(<p key={i}>{question}</p>);
				
				chathistoryLength = chathistoryLength-1;
			}				
		}
		
        
        return (
            <div className="chatroom">
                <h3>Product Survey</h3>
                <ul className="chats" ref="chats">
                    {
                    	/*chathistory.map((chat, index) => 
                            {
                            	console.log("chat inside Chatroom is", chat);
                            	console.log("chat.question is", chat.question);
                            	return <Message key={index} chat={chat} question={chat.question}/>
                            }
                        )*/
                      element
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
	}
}

export default Chatroom;