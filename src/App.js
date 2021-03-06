import React, { Component } from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import './App.css';
import QuestionContainer from './components/QuestionContainer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ThankYou from './components/ThankYou';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'EMPTY',
      participant_id: 'EMPTY'
    }
    
  }

  async componentDidMount() {
    await this.createServerRequest()
  }

  async refresh() {
    console.log("refreshing...")
    await this.createServerRequest()
  }

  updateState = (apiResponse) => {
    console.log("Input keyset")
    console.log(window.myKeySet)
    console.log(JSON.stringify(window.myKeySet))
    let keyset = JSON.parse(window.myKeySet ? window.myKeySet : '{}')
    console.log(typeof keyset);
    console.log(JSON.stringify(keyset['PARTICIPANT_ID']))
    
    this.setState({
      data: apiResponse,
      participant_id: JSON.stringify(keyset['PARTICIPANT_ID'])
    })
    this.forceUpdate();
    return apiResponse;
  }

  pprint = (data) => {
    if (data === undefined) {
      return <div className={'empty-text'}>Empty</div>
    }
    let ret = [<li>AHAH</li>]
    // data = data['questions']
    
    data = data['questions']
    if (data === undefined) {
      return <div className={'empty-text'}>Empty</div>
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

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: window.myKeySet,
    };

    // const url = 'https://xcap-backend-stg.herokuapp.com';
    // const url = 'https://xcap-backend-prd.herokuapp.com';
    const url = 'https://xcapteam-backend-prd.herokuapp.com/';
    // const url = 'http://localhost:5000';

    await fetch(url + '/get-questions', requestOptions)
    .then(response => response.json())
    .then(result => apiResponse = result)
    .then(data => this.updateState(data))
    .then(() => console.log("going", JSON.stringify(this.state)))
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
          <Router history={browserHistory}>
            <Route path='/' component={() => {
              return <QuestionContainer questions={this.state.data} participant_id={this.state.participant_id} refresh={this.createServerRequest}/>
              }
            } />
            <Route path='/thank-you' component={() => <ThankYou/>}/>
          </Router>
        </div>
    );
  }
}

export default App;
