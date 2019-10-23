import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Account from "./accounts.component";
import '../loginpage.css';
import './navbar.css';
import logo from "./Assets/logo2.png"

export default class Navbar extends Component {
    triggerLogout(){
        
        this.account.logout();
    }
    render() {
        
        return (
            <div className="whole-nav">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/home" className="navbar-brand navbar-logo"><img src = {logo}></img></Link>
                    <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                        <Link to="/home" className="nav-text">Home</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/upload" className="nav-text">Upload</Link>
                        </li>
                        <li className="navbar-item">
                        <div className="hide-this"><Account ref={account => this.account = account} /></div>
                        <Link to="" onClick={this.triggerLogout.bind(this)}className="nav-text">Logout</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        )
    }
}