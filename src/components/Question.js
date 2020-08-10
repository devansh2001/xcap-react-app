import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questionData
        }
    }

    getQuestionUI = (data) => {
        let ui = (
            <div>
                {/* <p>{data['text']}</p> */}
            </div>
        );
    }


    render() {
        return (
            <div>
                {this.state.data}
            </div>
        )
    }

}

export default Question;