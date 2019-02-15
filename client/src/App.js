import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    // Here's an example of how to confirm that a user is
    // still logged in after a refresh. This doesn't
    // have to go only here. You can abstract this to a
    // utility, too! This can be called from
    // different pages...this is an example to be EXTENDED.
    const token = localStorage.getItem("app-token");

    if (token) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }
  signup = () => {
    axios.post("/signup", {
      email: "user@example.com",
      password: "test"
    }).then(res => console.log(res.data));
  }
  requestData = () => {
    // check the console to see if this worked
    axios.get("/api/sensitive?secret_token=" + localStorage.getItem("app-token")).then(res => console.log(res.data));
  }
  login = () => {
    axios.post("/login", {
      email: "user@example.com",
      password: "test"
    }).then(res => {
      console.log(res.data.token)
      // here is the token that you'll have to send to get secured
      // data
      localStorage.setItem("app-token", res.data.token)
      this.setState({
        loggedIn: true
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>App Home Page</h2>
        </div>
        <div className="App-intro">
          <button onClick={this.signup}>Click here to signup (user@example.com/test)</button>
          <button onClick={this.login}>Click here to login</button>
          {
            this.state.loggedIn ? <button onClick={this.requestData}>Request login only data</button> : <div>Login To Continue</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
