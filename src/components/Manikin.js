import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

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
                <label>
                <input
                    type="radio" 
                    onClick={this.handleChange} 
                    name={this.state.question_id + '_' + option}
                    value={i}
                />
                
                <img src={require('../../public/resources/' + option.toLowerCase() + i + '.png')} />
                </label>
                <br/>
                </div>
            );
            
            comp.push(image);
        }

        // return <Image src="https://drive.google.com/file/d/1fOok5lMH7faDaF-uBiAjaGlSIJ5vHW--/view?usp=sharing" roundedCircle fluid />
        return comp;

    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.props.handleRadioChange(event.target.value, this.state.question_id + '_' + this.state.option);
    }

    render() {
        return (
            <div>
                {/* <div className='likert-option'>
                    {this.state.option}
                </div> */}
                <hr className={'manikin-divider'}/>
                {this.getManikinImages()}
            </div>
        )
    }
}

export default Manikin;