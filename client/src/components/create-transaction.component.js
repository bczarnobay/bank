import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class CreateTransaction extends Component {
    constructor(props) {
      super(props);

      this.onChangeAmount = this.onChangeAmount.bind(this);
      this.onChangeAccount = this.onChangeAccount.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        amount: 0,
        type: '',
        accountId: ''
      }
    }

    componentDidMount(){
        // axios.get('http://localhost:5000/users/')
        //   .then(response => {
        //     if (response.data.length > 0) {
        //       this.setState({
        //         users: response.data.map(user => user.username),
        //         username: response.data[0].username
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
    }

      onChangeAmount(e) {
        // const re = /^[0-9\b]+$/;      
        // if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({
            amount: e.target.value
          });
        // }
      }
        onChangeType(e) {
          console.log(e.target.value)
          this.setState({
            type: e.target.value
          });
        }

        onChangeAccount(e) {
          const re = /^[0-9\b]+$/;      
          if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
              accountId: e.target.value
            });
          }
      }
        onSubmit(e) {
            e.preventDefault();
            const transaction = {
              amount: Number(this.state.amount),
              type: this.state.type
            };
          console.log(transaction);

          axios.post('http://localhost:3333/v1/accounts/' +this.state.accountId + '/transactions/', transaction)
            .then(res => console.log(res.data))
            .catch((error) => {
              console.log(error);
           });

          // window.location = '/accounts/' + this.state.accountId;
          }

      render() {
        return (
            <div>
          <h3>Create New Transaction Log</h3>
          <form onSubmit={this.onSubmit}>            
            <div className="form-group">
              <label>Type: </label>
              <select name="type" id="type" value={this.state.type} onChange={this.onChangeType} className="form-control">
                <option value=""></option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Payment">Payment</option>
              </select>
            </div>
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
              <label>Amount: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Transaction Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}
