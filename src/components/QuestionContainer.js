import React, { Component } from 'react';
import Question from './Question';
import { Container, Row, Form, FormControl, InputGroup } from 'react-bootstrap';
import Likert from 'react-likert-scale';

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questions,
            responses: new Map()
        }
    }

    handleChange = (e) => {
        console.log(e.target.name)
        const option = e.target.name;
        console.log(e.target.getAttribute('question_id'))
        const question_id = e.target.getAttribute('question_id')
        if (question_id === undefined) {
            return;
        }
        let responses = this.state.responses;
        if (responses.has(question_id)) {
            let responsesToCurrentQuestion = responses.get(question_id)

            if (responsesToCurrentQuestion.has(option)) {
                responsesToCurrentQuestion.delete(option);
            } else {
                responsesToCurrentQuestion.add(e.target.name);
            }
            
            responses.set(question_id, responsesToCurrentQuestion);
        } else {
            let newResponseSet = new Set();
            newResponseSet.add(e.target.name);
            responses.set(question_id, newResponseSet);
        }

        this.setState({
            responses: responses
        });
    }

    handleLikertChange = (value, question_id) => {
        console.log(value);
        console.log(question_id);
        let responses = this.state.responses;
        responses.set(question_id, value);
        this.setState({
            responses: responses
        })
    }

    getSpaces = (question_id) => {
        let split = question_id.split("_");
        let num = parseInt(split[1]);
        let ret = ''
        for (let i = 0; i < num; i++) {
            ret += ' '
        }
        return ret;
    }

    getResponseValues = (data) => {
        if (data === undefined) {
            return;
        }
        // console.log(data);
        let responseType = data['response'][0];

        if (responseType === 'CHECKBOXES') {
            let responseValues = data['response_values'];
            let ui = [];
            for (let i = 0; i < responseValues.length; i++) {
                let item = (
                    <InputGroup className="mb-3" question_id={data['question_id']} name={responseValues[i]} >
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox onClick={this.handleChange} question_id={data['question_id']} name={responseValues[i]} aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>
                        <FormControl question_id={data['question_id']} name={responseValues[i]} aria-label="Text input with checkbox" value={responseValues[i]} />
                    </InputGroup>
                );
                ui.push(item);
            }
            return ui;
        }

        if (responseType === 'LIKERT_SCALE') {
            
            let options = {
                question: this.getSpaces(data['question_id']),
                responses: [
                    { value : 1, text: 'Not at all Concerned'},
                    { value : 2, text: 'Slightly Concerned'},
                    { value : 3, text: 'Undecided'},
                    { value : 4, text: 'Somewhat Concerned'},
                    { value : 5, text: 'Very Concerned'}
                ],
                picked: (val) => this.handleLikertChange(val, data['question_id'])
            }
            return (<div><Likert {...options} /></div>)
        }

    }

    pprint = (data) => {
        if (data === undefined) {
            return <div>Empty</div>
        }
        data = data['questions']
        let ret = []
        if (data === undefined) {
            return <div>Empty</div>
        }
        console.log(this.state)
        for (let i = 0; i < data.length; i++) {
            let item = (
                <div className={'individual-question'}>
                    <Row>
                        <p>{data[i]['text']}</p>
                        <hr/>
                        {this.getResponseValues(data[i])}
                        <br/>
                        <hr/>
                    </Row>
                <hr/>
                </div>
            )
            ret.push(item);
        }
        
        return ret;
    
      }

    chooseRenderItem = () => {
        if (this.state.data === 'EMPTY') {
            return <h1>Please Wait...</h1>
        }

        return <Question questionData={this.state.data} />

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.questions });  
    }

    render() {
        return (
            <div>
                <Container>
                    {this.pprint(this.state.data)}
                </Container>
            </div>
        );
    }
}

export default QuestionContainer;