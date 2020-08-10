import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questionData
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.questionData });  
    }

    getQuestionUI = (data) => {
        if (data === undefined) {
            return <div>EM3</div>
        }
        data = data['questions']
        if (data === undefined) {
            return <div>EM2</div>
        }
        let ui = (
            <div>
                <p>{data['text']}</p>
            </div>
        );
        return ui;
    }


    render() {
        return (
            <div>
                {this.getQuestionUI()}
            </div>
        )
    }

}

export default Question;