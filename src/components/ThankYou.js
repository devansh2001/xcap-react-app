import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

class ThankYou extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Thank you</h1>
                </Row>
                <Row>
                    <h3>You may now close the application</h3>
                </Row>
                <Row>
                    <h3>We will notify you when you need to complete the survey again</h3>
                </Row>
            </Container>
        )
    }
    
}

export default ThankYou;