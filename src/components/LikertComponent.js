import React, { Component } from 'react';
import { InputGroup, Container, Row } from 'react-bootstrap';

class LikertComponent extends Component {
    constructor(props) {
        super(props);
        console.log('In LikertComp State');
        console.log(this.props);
        this.state = {
            question_id: this.props.question_id,
            responses: this.props.responses
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ responses: nextProps.responses });  
    }

    getInputComponents = () => {
        let items = [];
        for (let i = 0; i < this.state.responses.length; i++) {
            console.log(this.state.question_id)
            const item = (<div>
                <input
                className={'likert-option'} 
                type="radio" 
                onClick={this.handleChange} 
                name={this.state.question_id}
                value={this.state.responses[i]['value']}
                /> {this.state.responses[i]['text']} </div>);
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