import React, {Component} from 'react';
import ResponseArea from './ResponseArea';
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
            completedResponses: false,
            responses: [],
            form_id: "",
            form_title: "",
            form_description: "",
            currentQuestion: "",
            position:0,
            answer_type:"",
            id: "",
            disableCustomeInputOptions:false
        }
        this.submitMessage = this.submitMessage.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    componentWillReceiveProps(props) {
        console.info("componentWillReceiveProps")
        console.log(props)
        this.setState({
            chatdata: props.questions,
            form_id: props.form_data["_id"],
            form_title: props.form_data.form_title,
            form_description: props.form_data.form_description
        })
        this.nextQuestion(props.questions)
    }
    nextQuestion(chathistory) {
        let questions = chathistory;
        let questionPointer = this.state.questionPointer;

        if (questionPointer < questions.length && questions.length !== 0) { // only proceed if there are more questions
            let nextQuestion = questions[questionPointer]
            // get the next question
            questionPointer++;
            // update state
            this.setState({
                quiz: this.state.quiz.concat([{
                    type: 'question',
                    id: nextQuestion["_id"],
                    content: nextQuestion.content,
                    answer_type: nextQuestion.answer_type,
                    options: nextQuestion.options,
                }]),
                questionPointer: questionPointer,
                currentQuestion: nextQuestion.content,               
            });
        }
        else if(questionPointer === questions.length && questions.length !== 0){
            console.log(this.state.responses);

            var answerData = {
                form_id: this.state.form_id,
                form_title: this.state.form_title,
                form_description: this.state.form_description,
                responses: this.state.responses,
            };

            axios.post('http://localhost:3000/responseData', answerData).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error);
            });   
            this.setState({
              completedResponses:true
            })
        }
    }

    submitMessage(answer, answer_type) {
      var responses = this.state.responses;
      responses.push({
        content_type: 'answer',
        question: this.state.currentQuestion,
        answer: answer
      });

        if (answer !== "") { // modify state only if the value is non-empty
            this.setState({
                quiz: this.state.quiz.concat([{
                    type: 'answer',
                    id: Math.random().toString(36).substr(2, 6), // add a random 6 char id
                    content:answer,
                    answer_type: null,
                    options: null,
                }]),
                responses: responses
            })
        } // endif
        setTimeout(this.nextQuestion.bind(this, this.state.chatdata), 1000)
    }
  	render() {
      const quiz = this.state.quiz; 
        if(this.state.completedResponses === true){
          return (
              <h4>Thanks! We'll be in touch! </h4>
          )
        }  
        let currentQuestion = this.state.chatdata[this.state.questionPointer - 1]
        var responseArea = "";
        
        if(currentQuestion !== undefined){
          responseArea = <ResponseArea ref="responseArea" answer_type={currentQuestion.answer_type} options_object={currentQuestion.options} submitMessage={this.submitMessage}/>
        }

        console.log(currentQuestion)          
          return (
              <div className="chatroom">
                  <h3>{this.state.form_title}</h3>
                  <ul className="chats" ref="chats">
                  {
                   
                   quiz.map((quiz_item, index) =>
                    <Message quiz_item={quiz_item} id={quiz_item.id} type={quiz_item.type} key={index} />  
                    )         
                  }
                  </ul>
                  {responseArea}
              </div>
          );
  	}
}

export default Chatroom;
