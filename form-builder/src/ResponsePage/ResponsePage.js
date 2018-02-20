import React, { Component } from 'react';
import axios from 'axios';

class ResponsePage extends Component {
	constructor() {
		super()
		this.state={
			dummydata: [],
			questionNumber:-1,
			answers:[]
		}
		this.selectValue = this.selectValue.bind(this);
		this.saveAnswers = this.saveAnswers.bind(this);
	}
	componentDidMount() {
		
		console.log("componentDidMount is rendered")
		//this.props.history.push('/responses?Ijustgotpushed');
		axios.get('http://localhost:3000/dummydata').then((response) => {
	     	var data = response.data.json_data;
	     	console.log("response is", data);
	     	if(Object.keys(data).length > 0) {
	     		
	     		this.setState({
	     			questionNumber:0
	     		})
	     	}
			this.setState({dummydata: data})
   		 }).catch(function(error){
    		console.log(error);
    }	);
	}
	saveAnswers(value) {
		let answers = this.state.answers;
		answers.push(value);
		this.setState({
			 	answers:answers
			})
		console.log(this.state.answers);
		this.refs.ans.value=' ';
	}
	selectValue(event) {
		// let answer_value = event.target.value;
		// let answer_value_string = answer_value.toString();
		//if(answer_value.length > 2) {
			//let answers = this.state.answers;
			// answers.push(event.target.value);
			// console.log(answers)
			// // let question_value= answers.push(answer_value);
			// this.setState({
			// 	answers:answers

			// })
			this.saveAnswers(event.target.value);

			let questionNumber = this.state.questionNumber;
			
			if(this.state.questionNumber < this.state.dummydata.length) {
				questionNumber = questionNumber+1;
				this.setState({
					questionNumber: questionNumber
				})		
			}
		//}
	}
	render() {
		let element = [];
		
		//let element = [];
		var dummydata = this.state.dummydata;
		let dummydatalength = dummydata.length;
		if(dummydatalength > 0) {
			for(var i=0; i<=(this.state.questionNumber); i++ ) {
				if(dummydatalength <= 0) { break; }
				let index = dummydata[i]
				
				let question = index["question"]
				
				element.push(<p key={i}>{question}</p>);
				
				dummydatalength = dummydatalength-1;
			}				
		}
		
		var ans = this.state.answers.map((answers, index)=> {
			return <div key={index}>{answers}></div>
		}) 
		console.log(this.state.answers);
    //console.log("this.state.questionNumber",this.state.questionNumber)
		 
		return(
			<div>
				<div>
					{element}{ans}
				</div>
				{/*<textarea className="textarea-style" type="text" id="question-text" rows="2" cols="50" 
					placeholder="Please enter your question." onBlur={(e)=>this.props.selectValue(e, index)} 
					style={{ display: 'inline-block'}}
				/>*/}
				<textarea type="text" id="question-text" rows="2" cols="50" ref="ans"
					placeholder="Please answer the question." onBlur={(e) => this.selectValue(e)}/>
				
			</div>
		)
	}
}

export default ResponsePage;