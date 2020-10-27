import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Account = props => (
  <tr>
    <td>{props.account.accountId}</td>
    <td>{props.account.currentBalance}</td>
    <td>{props.account.createdAt.substring(0,10)}</td>
    <td>{props.account.status}</td>
    <td>
      <Link to={"/accounts/"+props.account.accountId}>details</Link> 
    </td>
  </tr>
)

export default class AccountsList extends Component {
    constructor(props) {
      super(props);
      // this.deleteAccount = this.deleteAccount.bind(this);
      this.state = {accounts: []};
    }

    componentDidMount() {
      axios.get('http://localhost:3333/v1/accounts/')
       .then(response => {
         console.log(response)
         this.setState({ accounts: response.data.results });
       })
       .catch((error) => {
          console.log(error);
       })
    }

    // deleteAccount(id) {
    //   axios.delete('http://localhost:5000/accounts/'+id)
    //     .then(res => console.log(res.data));
    //   this.setState({
    //     accounts: this.state.accounts.filter(el => el._id !== id)
    //   })
    // }

    accountList() {
      return this.state.accounts.map(currentaccount => {
        // deleteAccount={this.deleteAccount}
        return <Account account={currentaccount}  key={currentaccount._id}/>;
      })
    }

  render() {
    return (
        <div>
            <h3>Logged Accounts</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Account Id</th>
                  <th>Current Balance</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                { this.accountList() }
              </tbody>
            </table>
          </div>
    )
  }
}
