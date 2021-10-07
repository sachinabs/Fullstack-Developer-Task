import axios from "axios";
import React, { Component } from 'react';
import InputField from "../components/InputField";
import { getCookies } from "../utils/utils"
import '../App.css';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: "" };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const user = getCookies("mail");
    if (user) {
      console.log("user1--->", user);
      // this.props.history.push("/service")
    }
  }

  handleChangeText(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }


  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    const { username, password } = this.state;
    axios.get(`http://localhost:1999/login?userEmail=${username}&userPassword=${password}`).then(result => {
      console.log("result--->", result);
      const { mail } = result.data;
      if (mail) {
          
      
        this.props.history.push("/service")
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "mail=" + mail + ";" + expires + ";path=/";
        document.cookie = "isAdmin=" + mail === "jeya270199@gmail.com" ? true: false+ ";" + expires + ";path=/";
      }


    })
    // var httpRequestForShowAll = new XMLHttpRequest();
    // httpRequestForShowAll.onreadystatechange = function () {
    //   if (this.readyState === 4 && this.status === 200) {

    //         console.log(this.response)
    //   }
    // };
    // httpRequestForShowAll.open("GET", `http://localhost:1999/login?userEmail=${username}&userPassword=${password}`, true);
    // httpRequestForShowAll.send();
  }

  handleRegister() {
    this.props.history.push("/register");
  }



  render() {
    return (
      <div id="box">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <InputField name="Username" value={this.state.username} onChange={(e) => this.handleChangeText(e)} />    <br/>
          <InputField name="Password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)} /> <br/>
          <input type="submit" value="Submit" /> 
        </form>
        <input type="button" value="Register" onClick={()=> this.handleRegister()} /> 
      </div>
    );
  }
}
export default Login;
