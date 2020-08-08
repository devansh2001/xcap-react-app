import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: window.myKeySet
    }
    
  }

  async componentDidMount() {
    await this.createServerRequest()
  }

  updateState = (apiResponse) => {
    this.setState({
      data: apiResponse
    })
    return apiResponse;
  }

  createServerRequest = async() => {
    console.log('in server req method');
    let apiResponse = null;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"body":{"test":["one","two"]}});

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: window.myKeySet,
    };

    await fetch("http://localhost:5000/get-questions", requestOptions)
    .then(response => response.json())
    .then(result => apiResponse = result)
    .then(data => this.updateState(data))
    .catch(error => console.log('error', error));

    await console.log(apiResponse);
    // const url = 'http://localhost:5000';
    

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
        <div className="App">
          <header className="App-header">
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
          </header>
        </div>
    );
  }
}

export default App;
