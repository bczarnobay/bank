import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Welcome</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/accounts" className="nav-link">Accounts</Link>
          </li>
          <li className="navbar-item">
          <Link to="/account" className="nav-link">Create Account</Link>
          </li>
          <li className="navbar-item">
          <Link to="/transaction" className="nav-link">Make a Transaction</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
