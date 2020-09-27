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
                Test
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

        console.log(comp);
        // comp = <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.educba.com%2Fuses-of-internet%2F&psig=AOvVaw3X-jeX8_8XkTJMASGwWPaj&ust=1601261061508000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjau7moiOwCFQAAAAAdAAAAABAJ' />
        return <Image src="https://ssl.gstatic.com/images/branding/googleg/2x/googleg_standard_color_64dp.png" roundedCircle fluid />

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