import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import AccountList from "./components/account-list.component";
import TransactionList from "./components/transaction-list.component";
import CreateAccount from "./components/create-account.component";
import CreateTransaction from './components/create-transaction.component';
import FindAccount from "./components/find-account.component";

function App() {
  return (
      <Router>
       <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={FindAccount} />
        <Route path="/accounts/" exact component={AccountList} />
        <Route path="/accounts/:id" component={TransactionList} />
        <Route path="/account" component={CreateAccount} />
        <Route path="/transaction" exact component={CreateTransaction} />
        <Route path="/transaction/:id" component={CreateTransaction} />
       </div>
     </Router>
  );
}

export default App;
