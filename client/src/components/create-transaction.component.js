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
      this.onChangeBarcode = this.onChangeBarcode.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      
      this.state = {
        amount: 0,
        type: '',
        accountId: this.props.match.params.id ,
        barcode: ''
      }
    }
      onChangeAmount(e) {
          this.setState({
            amount: e.target.value
          });
      }
        onChangeType(e) {
          this.setState({
            type: e.target.value
          });
        }

        onChangeBarcode(e) {
          this.setState({
            barcode: e.target.value
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

          window.location = '/accounts/' + this.state.accountId;
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
              <input  type="decimal"
                  required
                  className="form-control"
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                  />
            </div>

            { this.state.type === 'Payment' ? 
              <div className="form-group">
                <label>Barcode: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.barcode}
                    onChange={this.onChangeBarcode}
                    />
              </div> 
              :
              <div></div>
            }

            <div className="form-group">
              <input type="submit" value="Create Transaction Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}
