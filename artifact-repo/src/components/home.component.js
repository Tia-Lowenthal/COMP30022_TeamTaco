import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/itemtest">Item Test</Link>  
            </div>
        )
    }
}