import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAccount extends Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        account: ''
      };
    }
    onSubmit(e) {
      e.preventDefault();

      axios.post('http://localhost:3333/v1/accounts/')
        .then(res => { 
          this.setState({account: 'Account ' + res.data.account + ' created.'})
        });
    }

  render() {
    return (
        <div>
            <h3>Create New Account</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">                
                <label>{this.state.account}</label>
              </div>
              <div className="form-group">
                <input type="submit" value="Create Account" className="btn btn-primary" />
              </div>
            </form>
          </div>
    )
  }
}
