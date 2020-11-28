import React, { Component } from 'react';
import Question from './Question';
import LikertComponent from './LikertComponent';
import Manikin from './Manikin';
import { Container, Row, Spinner, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Likert from 'react-likert-scale';
import { browserHistory } from 'react-router';

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questions,
            participant_id: this.props.participant_id,
            responses: new Map(),
            otherFields: {
                question_2_other: '',
                question_4_other: '',
                question_5_other: '',
                question_6_other: ''
            },
            shouldDisableSubmit: true
        }
        this.url = 'https://xcap-backend-prd.herokuapp.com'
        // this.url = 'https://xcap-backend-stg.herokuapp.com'
        // this.url = 'http://localhost:5000'
    }

    renderSpinner = () => {
        if (this.state.data === 'EMPTY') {
          const item = (
            <Container>
                <Row className={'my-spinner'}>
                    <div>
                      <Spinner animation="border" /> 
                    </div>
                </Row>
                <br/>
              </Container>
          )
          return (item)
        }
    }

    isFormComplete = () => {
        const userResponses = this.state.responses;
        let isCompleted = true;
        const state = this.getStateAsDict();
        console.log("IS FORM COMPLETE")
        console.log(state['data']);
        const data = state['data'];
        console.log(data['question_1']);


        // check likerts - Q1, Q3, Q7 Valence, Q7 Arousal, Q7 Dominance
        isCompleted = isCompleted && (data['question_1'] !== undefined);
        console.log("1 - Q1 " + isCompleted);
        isCompleted = isCompleted && (data['question_3'] !== undefined);
        console.log("2 - Q3 " + isCompleted);
        isCompleted = isCompleted && (data['question_7_Valence'] !== undefined);
        console.log("3 - Q7 V " + isCompleted);
        isCompleted = isCompleted && (data['question_7_Arousal'] !== undefined);
        console.log("4 - Q7 A " + isCompleted);
        isCompleted = isCompleted && (data['question_7_Dominance'] !== undefined);
        console.log("5 - Q7 D " + isCompleted);

        // check multi-select with other option - Q2, Q4, Q5, Q6
        isCompleted = isCompleted && ((data['question_2_other'] !== undefined) || (data['question_2'] !== undefined && data['question_2'].length !== 0));
        console.log("6 - Q2 " + isCompleted);
        isCompleted = isCompleted && ((data['question_4_other'] !== undefined) || (data['question_4'] !== undefined && data['question_4'].length !== 0));
        console.log("7 - Q4 " + isCompleted);
        isCompleted = isCompleted && ((data['question_5_other'] !== undefined) || (data['question_5'] !== undefined && data['question_5'].length !== 0));
        console.log("8 - Q5 " + isCompleted);
        isCompleted = isCompleted && ((data['question_6_other'] !== undefined) || (data['question_6'] !== undefined && data['question_6'].length !== 0));
        console.log("2 - Q6 " + isCompleted);

        const shouldDisableSubmit = !isCompleted;
        this.setState({
            shouldDisableSubmit: shouldDisableSubmit
        })
    }

    handleChange = async (e) => {
        console.log(e.target.name)
        const option = e.target.name;
        console.log(e.target.getAttribute('question_id'))
        const question_id = e.target.getAttribute('question_id')
        if (question_id === undefined) {
            return;
        }
        let responses = this.state.responses;

        if (question_id.includes("other")) {
            console.log("hello");
            // newResponseSet.add(e.target.value);
            // document.getElementById(question_id).innerHTML = '';
            let otherFields = this.state.otherFields;
            otherFields[question_id] = '';
            await this.setState({
                otherFields: otherFields
            })
        }

        if (responses.has(question_id)) {
            let responsesToCurrentQuestion = responses.get(question_id)

            if (question_id.includes("other")) {
                responses.delete(question_id);
            } else {
                if (responsesToCurrentQuestion.has(option)) {
                    responsesToCurrentQuestion.delete(option);
                } else {
                    responsesToCurrentQuestion.add(e.target.name);
                }
                responses.set(question_id, responsesToCurrentQuestion);
            }
        } else {
            let newResponseSet = new Set();
            
            if (!question_id.includes("other")) {
                newResponseSet.add(e.target.name);
            }
            
            responses.set(question_id, newResponseSet);
        }

        this.setState({
            responses: responses
        });
        this.isFormComplete();
    }

    handleRadioChange = (value, question_id) => {
        console.log(value);
        console.log(question_id);
        let responses = this.state.responses;
        responses.set(question_id, value);
        this.setState({
            responses: responses
        })
        this.isFormComplete();
    }

    handleSubmit = async () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        
        let stateAsDict = await this.getStateAsDict();
        let bodyData = {};
        // bodyData['data'] = stateAsDict
        // bodyData['participant_id'] = this.state.participant_id
        console.log(stateAsDict)
        await fetch(this.url + '/submit-survey', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(stateAsDict)
        })
        .then(res => {console.log(res); res.json()})
        .then(data => console.log(data))
        .catch(error => console.log(error));

        // window.location.href = 'https://gtspuds.com';
        // browserHistory.push('/thank-you');
    }

    getStateAsDict = () => {
        let result = {}
        let responses = this.state.responses;
        responses.forEach((val, key, map) => {
            console.log(key + " " + val);
            if (val instanceof Set) {
                console.log('Found set for ' + key);
                let arr = Array.from(val);
                result[key] = arr
            } else {
                result[key] = val
            }
        });
        console.log('Result');
        console.log(result);
        let out = {};
        out['data'] = result;
        out['participant_id'] = this.state.participant_id ? this.state.participant_id :'EMPTY' ;
        out['chosen_data'] = this.state.data['chosen_data']
        console.log("OUT DATA");
        console.log(this.state.participant_id);
        console.log(out);
        console.log(JSON.stringify(out))
        return out;
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

    handleOtherChange = (e) => {
        const question_id = e.currentTarget.name;
        const val = e.target.value;

        let responses = this.state.responses;
        let newResponseSet = new Set();
        newResponseSet.add(val);
        responses.set(question_id, newResponseSet);
        let otherFields = this.state.otherFields;
        otherFields[question_id] = val;
        this.setState({
            responses: responses,
            otherFields: otherFields
        })

        this.isFormComplete();
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
                        <label>
                            <Container>
                                <Row>
                                    <table>
                                        <tr>
                                            <td>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Checkbox onClick={this.handleChange} question_id={data['question_id']} name={responseValues[i]} />
                                                </InputGroup.Prepend>
                                            </td>
                                            <td>
                                                <div className={'my-checkbox-value'} onClick={this.handleChange} >
                                                    <div className={'add-spacing'}>
                                                        <p className={'checkbox-text'} onClick={this.handleChange} question_id={data['question_id']} name={responseValues[i]} value={responseValues[i] }> {responseValues[i]} </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                </Row>
                            </Container>
                        </label>
                        {/* <Form.Control readOnly question_id={data['question_id']} name={responseValues[i]} type='text' value={responseValues[i] } /> */}
                    </InputGroup>
                );
                ui.push(item);
            }

            const otherItem = (
                <InputGroup className="mb-3" question_id={data['question_id'] + "_other"} name={'other'} >
                    <label>
                        <Container>
                            <Row>
                                <InputGroup.Prepend className={'other-box'}>
                                    <InputGroup.Checkbox onClick={this.handleChange} question_id={data['question_id'] + "_other"} name={'other'} aria-label="Checkbox for following text input" />
                                </InputGroup.Prepend>
                            
                                <div>
                                    <div>
                                        <p onClick={this.handleChange} question_id={data['question_id'] + "_other"} name={'other'} value={''} id={data['question_id'] + "_other"} />
                                    </div>

                                    <FormControl
                                        className={'my-checkbox-value'}
                                        placeholder="Other"
                                        aria-label="Amount (to the nearest dollar)"
                                        question_id={data['question_id'] + "_other"}
                                        name={data['question_id'] + "_other"}
                                        onChange={this.handleOtherChange}
                                        value={this.state.otherFields[data['question_id'] + "_other"]}
                                        disabled={!this.state.responses.has(data['question_id'] + "_other")}
                                    />
                                </div>
                            </Row>
                        </Container>
                    </label>
                    {/* <Form.Control readOnly question_id={data['question_id']} name={responseValues[i]} type='text' value={responseValues[i] } /> */}
                </InputGroup>
            );
            ui.push(otherItem);
            return ui;
        }

        if (responseType === 'LIKERT_SCALE') {
            return (<div>
                    {/* <Likert {...options} /> */}
                    <LikertComponent handleRadioChange={this.handleRadioChange} question_id={data['question_id']}/>
                </div>
            )
        }

        if (responseType == 'MANIKIN') {
            return (
                <div>
                    <br/>
                    <Container>
                        <Row className='custom-likert'>
                            <br/>
                            <Manikin option='Valence'handleRadioChange={this.handleRadioChange} question_id={data['question_id']} />
                        </Row>
                        <Row className='custom-likert'>
                            <br/>
                            <Manikin option='Arousal' handleRadioChange={this.handleRadioChange} question_id={data['question_id']} />
                        </Row>
                        <Row className='custom-likert'>
                            <br/>
                            <Manikin option='Dominance' handleRadioChange={this.handleRadioChange} question_id={data['question_id']} />
                        </Row>
                    </Container>
                </div>
            )
        }

    }

    pprint = (data) => {
        if (data === undefined) {
            // Do NOT change the innerHTML for this div to avoid breaking changes
            return <div className={'empty-text'}>Empty</div>
        }
        data = data['questions']
        let ret = []
        if (data === undefined) {
            // Do NOT change the innerHTML for this div to avoid breaking changes
            return <div className={'empty-text'}>Empty</div>
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
        this.setState({ data: nextProps.questions, participant_id: nextProps.participant_id });  
    }

    render() {
        return (
            <div>
                {this.renderSpinner()}
                <Container>
                    {this.pprint(this.state.data)}
                    <Row style={{justifyContent: 'center'}}>
                        <div>
                            <Button disabled={this.state.shouldDisableSubmit} onClick={this.handleSubmit}> Submit </Button>
                        </div>
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }
}

export default QuestionContainer;