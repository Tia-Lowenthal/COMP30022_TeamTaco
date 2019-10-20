import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Account from "./accounts.component";

export default class Navbar extends Component {
    triggerLogout(){
        
        this.account.logout();
    }
    render() {
        
        return (
            <div>
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
                        <Account ref={account => this.account = account} />
                        <button onClick={this.triggerLogout.bind(this)}>Logout</button>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        )
    }
}