import React, { Component } from 'react';

class Manikin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option : this.props.option
        }
    }

    getManikinImages = () => {
        let option = this.state.option;
        let comp = [];
        for (let i = 1; i <= 5; i++) {
            let image = (<div>
                <img src={require('../resources/' + option + i + '.png')} />
                <br/>
                </div>
            );
            comp.push(image);
        }
        
        return <div>{comp}</div>
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