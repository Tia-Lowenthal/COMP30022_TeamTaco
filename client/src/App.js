import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import Upload from "./components/upload.component";
import Account from "./components/accounts.component";
import Items from "./components/items.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/home" className="navbar-brand">Artifacts Register</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/home" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/upload" className="nav-link">Upload</Link>
                </li>
                <li className="navbar-item">
                  
                  <Link to="/" className="nav-link">Logout</Link>
                  
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/upload" component={Upload} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Account}/>
          <Route path="/items/:itemId" component={Items}/>
        </div>
      </Router>
    );
  }
}

export default App;