import React, { Component } from 'react';
import Question from './Question';
import { Container, Row, Form, FormControl, InputGroup } from 'react-bootstrap';
import CheckboxGroup from 'react-checkbox-group'


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
                        <FormControl question_id={'question_id'} name={responseValues[i]} aria-label="Text input with checkbox" value={responseValues[i]} />
                    
                    </InputGroup>
                    
                );
                ui.push(item);
            }
            return ui;
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
                <Row>
                    <p>{data[i]['text']}</p>
                    <hr/>
                    {this.getResponseValues(data[i])}
                    <br/>
                </Row>
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
                {/* {this.state.data} */}
                    {this.pprint(this.state.data)}
                    {/* {this.chooseRenderItem()} */}
                </Container>
            </div>
        );
    }
}

export default QuestionContainer;