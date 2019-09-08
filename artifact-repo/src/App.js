import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import Upload from "./components/upload.component";
import MyProfile from "./components/profile.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Artifacts Register</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/upload" className="nav-link">Upload</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/profile" className="nav-link">My Profile</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/upload" component={Upload} />
          <Route path="/profile" component={MyProfile} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;