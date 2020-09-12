import React, { Component } from 'react';
import { InputGroup, Container, Row } from 'react-bootstrap';
const shuffle = require('shuffle-array');

class LikertComponent extends Component {
    constructor(props) {
        super(props);
        console.log('In LikertComp State');
        console.log(this.props);
        this.state = {
            question_id: this.props.question_id,
        }
        this.responses = [
            { value : 1, text: 'Not at all Concerned'},
            { value : 2, text: 'Slightly Concerned'},
            { value : 3, text: 'Undecided'},
            { value : 4, text: 'Somewhat Concerned'},
            { value : 5, text: 'Very Concerned'}
        ]
        shuffle(this.responses);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ question_id: nextProps.question_id });  
    // }

    getInputComponents = () => {
        let items = [];
        for (let i = 0; i < this.responses.length; i++) {
            console.log(this.state.question_id)
            const item = (<div>
                <input
                    className={'likert-option'}
                    type="radio" 
                    onClick={this.handleChange} 
                    name={this.state.question_id}
                    value={this.responses[i]['value']}
                /> {this.responses[i]['text']} </div>);
            items.push(item);
        }
        console.log(items);
        return items;
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.props.handleLikertChange(event.target.value, this.state.question_id);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className='custom-likert'>
                        <form >
                            {this.getInputComponents()}
                        </form>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default LikertComponent;