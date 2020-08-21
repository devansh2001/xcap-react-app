import React, { Component } from 'react';
import './App.css';
import QuestionContainer from './components/QuestionContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'EMPTY',
      participant_id: ''
    }
    
  }

  async componentDidMount() {
    await this.createServerRequest()
  }

  updateState = (apiResponse, participant_id) => {
    this.setState({
      data: apiResponse,
      participant_id: participant_id
    })
    this.forceUpdate();
    return apiResponse;
  }

  pprint = (data) => {
    if (data === undefined) {
      return <div>Empty</div>
    }
    let ret = [<li>AHAH</li>]
    // data = data['questions']
    
    data = data['questions']
    if (data === undefined) {
      return <div>Empty</div>
    }
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      ret.push(<li>{data[i]['text']}</li>);
    }
    return ret;

  }

  createServerRequest = async() => {
    console.log('in server req method');
    let apiResponse = null;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({"body":{"test":["one","two"]}});

    const participant_id = typeof(window.myKeySet) != 'undefined' ? window.myKeySet['PARTICIPANT_ID'] : null;
    // if (typeof(window.myKeySet) != 'undefined') {
    //   window.myKeySet.delete('PARTICIPANT_ID');
    // }
    

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: window.myKeySet,
    };

    const url = 'https://xcap-backend-stg.herokuapp.com';
    // const url = 'http://localhost:5000';

    await fetch(url + '/get-questions', requestOptions)
    .then(response => response.json())
    .then(result => apiResponse = result)
    .then(data => this.updateState(data, participant_id))
    .catch(error => console.log('error', error));

    await console.log(apiResponse);
    
    

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    
    // let body = JSON.stringify({
    //   body: window.myKeySet
    // })
    // var raw = JSON.stringify({"body":{"test":["one","two"]}});

    // await fetch(url + '/get-questions', {
    //   method: 'POST',
    //   body: raw,
    //   mode: 'no-cors',
    //   headers: myHeaders
    // })
    //   .then(response => response.json())
    //   .then(data => this.updateState(data))
    //   .then(data => apiResponse = data)
    //   .catch(error => console.log(error));
    //   // .then(() => this.setState({
    //   //   data: apiResponse
    //   // }))
      

    // await console.log(this.state.data)
    //   // this.setState({
    //   //   data: apiResponse
    //   // })
  }

  render() {
    return (
        <div className="outer">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
              {console.log(this.state.data)}
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}
          {/* <ul>{this.pprint(this.state.data)}</ul> */}
          
          <QuestionContainer questions={this.state.data} participant_id={this.state.participant_id}/>
        </div>
    );
  }
}

export default App;
