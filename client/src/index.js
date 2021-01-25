import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import "./styles/main.css";
import AllWallets from "./components/AllWallets";
import NewWallet from "./components/NewWallet";
import CheckBalance from "./components/Check";
import AddFunds from "./components/AddFunds";
import SpendFunds from "./components/SpendFunds";
import Transactions from "./components/Transactions";
import P2p from "./components/P2p";

const App = () => {
  return (
    <>
      <div className="container">
        <h2 className="mt-4">Personal Wallet</h2>
        <div className="foo">
          <Router>
            <div className="list-group listnav">
              <NavLink
                to="/allwallets"
                className="list-group-item"
                activeClassName="active"
              >
                All Wallets
              </NavLink>
              <NavLink
                to="/newwallet"
                className="list-group-item"
                activeClassName="active"
              >
                New Wallet
              </NavLink>
              <NavLink
                to="/checkbalance"
                className="list-group-item"
                activeClassName="active"
              >
                Check Balance
              </NavLink>
              <NavLink to="/addfunds" className="list-group-item">
                Add funds
              </NavLink>
              <NavLink
                to="/spend"
                className="list-group-item"
                activeClassName="active"
              >
                Spend Funds
              </NavLink>
              <NavLink to="/transactions" className="list-group-item">
                All Transactions
              </NavLink>
              <NavLink to="/p2p" className="list-group-item">
                P2P
              </NavLink>
            </div>
            <Switch>
              <Route path="/allwallets">
                <AllWallets />
              </Route>

              <Route path="/newwallet">
                <NewWallet />
              </Route>
              <Route path="/checkbalance">
                <CheckBalance />
              </Route>
              <Route path="/addfunds">
                <AddFunds />
              </Route>
              <Route path="/spend">
                <SpendFunds />
              </Route>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path="/p2p">
                <P2p />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
