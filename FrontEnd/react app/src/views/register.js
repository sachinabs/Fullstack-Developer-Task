import React, { Component } from 'react'
import InputField from '../components/InputField';


export class register extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: "" };
      }

    handleChangeText(event) {
        this.setState({ username: event.target.value });
      }
      handleChangePassword(event) {
        this.setState({ password: event.target.value });
      }
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
          <InputField  name="Username" value={this.state.username} onChange={(e) => this.handleChangeText(e)} />    <br/>
          <InputField name="Password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)} /> <br/>
          <input type="submit" value="Register" /> 
        </form>
            </div>
        )
    }
}

export default register
