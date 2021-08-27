import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class SubmitError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Alert variant={'danger'} show={this.props.isVisible}>
                    Please ensure that you have completed all questions before submitting
                </Alert>
            </div>
        );
    }
}

export default SubmitError;