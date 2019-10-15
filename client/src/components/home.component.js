import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ItemSearch from './itemsearch.component';



export default class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home</h3>
                <h4>Items</h4>
                <ItemSearch/>
            </div>
        )
    }
}