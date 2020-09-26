import React, { Component } from 'react';

class Manikin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option : this.props.option,
            question_id: this.props.question_id
        }
    }

    getManikinImages = () => {
        let option = this.state.option;
        let comp = [];
        for (let i = 1; i <= 5; i++) {
            let image = (<div>
                <input
                    type="radio" 
                    onClick={this.handleChange} 
                    name={this.state.question_id + '_' + option}
                    value={i}
                />
                <img src={require('../resources/' + option + i + '.png')} />
                <br/>
                </div>
            );
            comp.push(image);
        }
        
        return <div>{comp}</div>
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.props.handleRadioChange(event.target.value, this.state.question_id + '_' + this.state.option);
    }

    render() {
        return (
            <div>
                {this.getManikinImages()}
            </div>
        )
    }
}

export default Manikin;