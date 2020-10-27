import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAccount extends Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeAccount = this.onChangeAccount.bind(this);
      this.state = {
        account: ''
      };
    }

    onSubmit(e) {
      e.preventDefault();
      console.log(this.state)
      axios.get('http://localhost:3333/v1/accounts/' + this.state.account)
        .then(res => { 
          window.location = '/accounts/' + this.state.account;
        });

        
    }

    onChangeAccount(e) {
      const re = /^[0-9\b]+$/;      
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({
          account: e.target.value
        });
      }
  }
  render() {
    return (
        <div>
            <h3>Find Account</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">     
                  <label>Account: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.accountId}
                      onChange={this.onChangeAccount}
                      />
                </div>         
              <div className="form-group">
                <input type="submit" value="Find Account" className="btn btn-primary" />
              </div>
            </form>
          </div>
    )
  }
}
