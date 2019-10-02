import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ItemGroup from './itemgroup.component';



export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home</h3>
                <Link to="/itemtest">Item Test</Link>
                <h4>Items</h4>
                <ItemGroup/>
            </div>
        )
    }
}