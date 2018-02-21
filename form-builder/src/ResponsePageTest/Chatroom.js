import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './ResponsePageTest.css';
import Message from './Message';

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: [],
            questionPointer: 0,
            chatdata: [],
            completedResponses: false
        }
        this.submitMessage = this.submitMessage.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    componentWillReceiveProps(props) {
        console.info("componentWillReceiveProps")
        console.log(props)
        this.setState({
            chatdata: props.chathistory
        })
        this.nextQuestion(props.chathistory)
    }
    nextQuestion(chathistory) {
        // if(chathistory == null){
        //   chathistory = this.state.chatdata
        // }
        console.log("inside nextQuestion is PROPS", chathistory)
        let questions = chathistory;
        console.log("questions", questions)
        let questionPointer = this.state.questionPointer

        
        console.log("questionPointer", questionPointer)

        if (questionPointer < questions.length && questions.length != 0) { // only proceed if there are more questions
            let nextQuestion = questions[questionPointer]
            // get the next question
            questionPointer++
            // update state
            this.setState({
                quiz: this.state.quiz.concat([{
                    type: 'question',
                    id: nextQuestion.id,
                    /*content: <span> {
                        nextQuestion.content
                    } </span>,*/
                    content: nextQuestion.content,
                    response_type: nextQuestion.answer_type,
                    options: nextQuestion.options
                }]),
                questionPointer: questionPointer
            });
        }else if(questionPointer === questions.length && questions.length != 0){
          this.setState({
            completedResponses: true
          });
        }
    }

    submitMessage(event) {
        // e.preventDefault();
        // console.log("this.refs.msg.value",this.refs.msg.value);
        // console.log("questionNumber is ", questionNumber)
        // this.setState({
        //     chats: this.state.chats.concat([{
        //       question: this.props.chathistory[questionNumber].question,
        //       content: ReactDOM.findDOMNode(this.refs.msg).value
        //     }])
        // }, () => {
        //     ReactDOM.findDOMNode(this.refs.msg).value = "";
        // });

        event.preventDefault()
        let ans = ReactDOM.findDOMNode(this.refs.msg).value

        if (ans !== "") { // modify state only if the value is non-empty
            this.setState({
                quiz: this.state.quiz.concat([{
                    type: 'answer',
                    id: Math.random().toString(36).substr(2, 6), // add a random 6 char id
                    /*content: <span> {
                        ans
                    } </span>,*/
                    content:ans,
                    response_type: null,
                    options: null
                }])
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = ""
            })
        } // endif
        let timeout = setTimeout(this.nextQuestion.bind(this, this.state.chatdata), 1000)
    }
	
  	render() {
      const { chathistory, questionNumber } = this.props;
      const quiz = this.state.quiz; 

      const chats = this.state.chats;
  		//console.log("this.state.questionPointer"+this.state.questionPointer);
      console.log("this.state.quiz", this.state.quiz);

      if(this.state.completedResponses === true){
          return (
              <h4>Thanks! We'll be in touch! </h4>
          )
      }    
          return (
              <div className="chatroom">
                  <h3>Tag Hash</h3>
                  <ul className="chats" ref="chats">
                  {
                   
                   quiz.map((quiz_item, index) =>
                    <Message quiz_item={quiz_item} id={quiz_item.id} type={quiz_item.type} key={index} />  
                    )         
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

/*chathistory.map((chathistory, index) => 
                            {
                              return <Message key={index} chathistory={chathistory} question={chathistory.question}
                                     questionNumber={this.props.questionNumber}/>
                            }
                        ) */  