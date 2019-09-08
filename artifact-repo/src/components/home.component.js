import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ItemTest from "./itemtest.component";

export default class Home extends Component {
    render() {
        return (
            <Router>
            <div>
                <Link to="/itemtest">Item Test</Link>
            </div>
            <Route exact path="/itemtest" component={ItemTest} />
            </Router>
        )
    }
}