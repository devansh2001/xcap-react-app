import React, { Component } from 'react';
import Question from './Question';

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.questions
        }
    }

    render() {
        return (
            <div>
                {/* <Question questionData={this.state.data[0]}/> */}
                {/* {this.state.data} */}
                Hello World
            </div>
        );
    }
}

export default QuestionContainer;