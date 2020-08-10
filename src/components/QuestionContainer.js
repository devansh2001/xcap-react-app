import React, { Component } from 'react';
import Question from './Question';
import { Container, Row, FormControl, InputGroup } from 'react-bootstrap';

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questions
        }
    }

    getResponseValues = (data) => {
        if (data === undefined) {
            return;
        }
        console.log(data);
        let responseType = data['response'][0];

        if (responseType === 'CHECKBOXES') {
            let responseValues = data['response_values'];
            let ui = [];
            for (let i = 0; i < responseValues.length; i++) {
                let item = (
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>
                        <FormControl aria-label="Text input with checkbox" value={responseValues[i]} />
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
        console.log(data)
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