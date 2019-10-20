import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import Upload from "./components/upload.component";
import Account from "./components/accounts.component";
import Items from "./components/items.component";
import Navbar from "./components/navbar.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
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