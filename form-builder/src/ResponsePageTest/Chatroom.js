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
        //this.get_option_values = this.get_option_values.bind(this);
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
        // if(chathistory == null){
        //   chathistory = this.state.chatdata
        // }
        //console.log("inside nextQuestion is PROPS", chathistory)
        let questions = chathistory;
        //console.log("questions", questions)
        let questionPointer = this.state.questionPointer;
        let position = this.state.position;
        
        //console.log("questionPointer", questionPointer)

        if (questionPointer < questions.length && questions.length != 0) { // only proceed if there are more questions
            let nextQuestion = questions[questionPointer]

            console.log("nextQuestion", nextQuestion)
            // get the next question
            questionPointer++;

            position++;
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
          // console.log("this.state.id", this.state.quiz["questionPointer"].id)
        }
        else if(questionPointer === questions.length && questions.length != 0){
            console.log(this.state.responses);

            var answerData = {
                form_id: this.state.form_id,
                form_title: this.state.form_title,
                form_description: this.state.form_description,
                responses: this.state.responses,
            };

            //console.log(answerData);

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
      console.log(this.refs.responseArea);
      this.refs.responseArea
      console.log("SUBMITMESSAGE", answer);
      console.log("SUBMITMESSAGE", answer_type)
      // let ans;
      // if(answer_type === "Paragraph") {
      //   ans = ReactDOM.findDOMNode(this.refs.msg).value
      // }
      // else if(answer_type === "MultipleChoice") {
      //   ans= document.getElementById('option_key'+option_key).textContent;
      // }
      // else if(answer_type === "Checkboxes") {
      //    //ans= document.getElementById('option_key'+option_key).textContent;
      //    //ans = ReactDOM.findDOMNode(this.refs.msg).value
      //    ans= document.getElementById('option_key'+option_key).textContent;
      // }
  
      var responses = this.state.responses;
      responses.push({
        content_type: 'answer',
        question: this.state.currentQuestion,
        //answer: ReactDOM.findDOMNode(this.refs.msg).value
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
            }, () => {
                //ReactDOM.findDOMNode(this.refs.msg).value = "";
            })
        } // endif
        let timeout = setTimeout(this.nextQuestion.bind(this, this.state.chatdata), 1000)
    }

	   // get_option_values(event, option_key) {
    //   var option_key_value= document.getElementById('option_key'+option_key).textContent
    //   console.log(option_key_value)
    //   this.setState({
    //             quiz: this.state.quiz.concat([{
    //                 type: 'answer',
    //                 id: Math.random().toString(36).substr(2, 6), // add a random 6 char id
    //                 content:option_key_value,
    //                 answer_type: null,
    //                 options: null
    //             }]),
    //             }, () => {
    //             ReactDOM.findDOMNode(this.refs.radioref).value = ""
    //         })
    //   let timeout = setTimeout(this.nextQuestion.bind(this, this.state.chatdata), 1000)
    // }
  	render() {
      const { chathistory, questionNumber } = this.props;
      const quiz = this.state.quiz; 

      var position=0;
  		// var answer_type = quiz.map((quiz_item, index) => {
    //             //<Message quiz_item={quiz_item} id={quiz_item.id} type={quiz_item.type} key={index} />  
    //       if(quiz_item.answer_type === "Paragraph") {
    //           return <input key={index} type="text" ref="msg"/>
    //       } 
    //       else if(quiz_item.answer_type === "MultipleChoice") {
    //         var options_arary=[];
    //         for(let option_key in quiz_item.options) {

    //           var radio_option = <div className="hideinputbox" onClick={(e) => this.submitMessage(e, option_key, quiz_item.answer_type)}>
    //                                 <label  key={option_key}>
    //                                 <input type="radio" name="radAnswer"/>{quiz_item.options[option_key]}</label>
    //                               </div>
                                  
    //           {var radio_option = <div>
    //                                 <input type="radio"/>
    //                                 <label value={quiz_item.options[option_key]}/>
    //                              </div>}
    //           options_arary.push(radio_option);
    //         }
    //         return options_arary;
    //       }
    //       else if(quiz_item.answer_type === "Checkboxes") {
    //         var checkboxes_arary=[];
    //         for(let option_key in quiz_item.options) {

    //           var radio_option = <label  key={option_key} key={option_key} id={"option_key"+option_key} onClick={(e) => this.submitMessage(e, option_key, quiz_item.answer_type)}>
    //                               <input type="checkbox"/>{quiz_item.options[option_key]}
    //                             </label>
    //           checkboxes_arary.push(radio_option);
    //         }
    //         return checkboxes_arary;
    //       }

    //   });    // end of quiz map function
    
        if(this.state.completedResponses === true){
          return (
              <h4>Thanks! We'll be in touch! </h4>
          )
        }  

        let currentQuestion = this.state.chatdata[this.state.questionPointer - 1]
        var responseArea = "";
        
        if(currentQuestion != undefined){
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
                  {/*<form className="input" onSubmit={(e) => this.submitMessage(e)}>
                      {responseArea}
                      <input type="submit"  value="Send"/>
                  </form> */}
                  {responseArea}
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