import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Transaction = props => ( 
  <tr>    
    <td>{props.transactions.amount}</td>
    <td>{props.transactions.createdAt.substring(0,10)}</td>
    <td>{props.transactions.type}</td>
    <td>{props.transactions.barcode}</td>
  </tr>
)

const Summary = props => (
  <div>
    <tr>
      <label>Account</label>
      <td>{props.summary.accountId}</td>
    </tr>
    <tr>
      <label>Balance</label>
      <td>{props.summary.currentBalance}</td>
    </tr>
    <tr>
      <label>Created At</label>
      <td>{props.summary.createdAt}</td>
    </tr>
    <tr>
      <label>Status</label>
      <td>{props.summary.status}</td>
    </tr>
  </div>
)

export default class AccountsList extends Component {
    constructor(props) {
      super(props);
      this.state = { transactions: [],
                     summary: '' };
    }

    componentDidMount() {
      axios.get('http://localhost:3333/v1/accounts/' +this.props.match.params.id + '/transactions/')
       .then(response => {
         this.setState({ transactions: response.data.results });
       })
       .catch((error) => {
          console.log(error);
       })

      axios.get('http://localhost:3333/v1/accounts/' +this.props.match.params.id)
        .then(response => {
          console.log(response)
          this.setState({summary: response.data})
        })
    }

    transactionsList() {
      return this.state.transactions.map(currentTransaction => {
        return <Transaction transactions={currentTransaction} />;
      })
    }

    fillSummary() {
      return <Summary summary={this.state.summary}/>
    }

  render() {
    return (
        <div>
          <h3>Summary</h3>
            {this.fillSummary() }
            <h3>Transactions</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Amount</th>
                  <th>Created At</th>
                  <th>Type</th>
                  <th>Barcode</th>
                </tr>
              </thead>
              <tbody>
                { this.transactionsList() }
              </tbody>
            </table>
            <Link to={"/transaction/" + this.props.match.params.id}>Make Transaction</Link> 
          </div>
    )
  }
}
