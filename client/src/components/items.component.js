import React, { Component } from 'react';
import axios from 'axios';

import ItemImages from "./itemimages.component"
import ItemInfo from "./iteminfo.component";
import ViewHistory from "./viewhistory.component";
import ViewFinance from "./viewfinance.component";
import ViewCurrentInfo from "./viewcurrentinfo.component";
import TagGroup from './taggroup.component';
import Navbar from "./navbar.component";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Items extends Component {
        constructor(props) {
            super(props);    
            this.currentItemId = this.props.match.params.itemId;      
            this.state = {
                fetchedItem: {
                    title: '',
                    category: '',
                    condition: '',
                    description: '',
                    image1: '',
                    image2: '',
                    image3: '',
                    tags: [],
                    placeOfOrigin: '',
                    yearOfOrigin: '',
                    dateAcquired: '',
                    originalPrice: '',
                    history: '',
                    certifiedAuthentic: '',
                    estimatedValue: '',
                    valuer: '',
                    insuredValue: '',
                    insurer: '',
                    currentLocation: '',
                    saleStatus: '',
                    displayStatus: '',
                    needLicense: '',
                    itemId: ''
                }
            } 
        }
        
        componentDidMount() {
            axios.get('/items/'+ this.props.match.params.itemId)
            .then(response => {
                console.log("response", response);
                this.setState({
                fetchedItem: response.data[0]
                });
            console.log("fetchedItem", this.state.fetchedItem);
            })
            .catch(function (error) {
                console.log(error);
              })
        }

    onDelete = () => {
        axios.delete('/items/'+ this.currentItemId)
            .then(response => {
                console.log("response", response);
                this.setState({
                fetchedItem: response.data[0]
        })});
        window.location = '/home';
    }
        
    render() {
        
        return (
            <div>
            <Navbar/>
            <div className = "row">
                <div className = "col">

                    <ItemImages currentItemId = {this.currentItemId}/><br/>  
                    <b>Tags: </b> 
                    <TagGroup tagArray={this.state.fetchedItem.tags} mode="static"/>
                    <br/>
                    <button type = "delete" className = "btn btn-primary btn-lg" onClick={this.onDelete}>Delete</button> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to= {'/edit/'+this.state.fetchedItem.itemId}>
                    <button type = "edit" className = "btn btn-primary btn-lg">Edit</button>
                    </Link>
                    
                </div>
                <div className = "col">
                    <ItemInfo currentItemId = {this.currentItemId}/><br/> 
                    <ViewHistory currentItemId = {this.currentItemId}/><br/>
                    <ViewFinance currentItemId = {this.currentItemId}/><br/>
                    <ViewCurrentInfo currentItemId = {this.currentItemId}/><br/>
                    <br/>
                    
                </div>
            </div>
            </div>
        )
    }
}