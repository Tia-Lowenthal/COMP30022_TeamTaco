import React, { Component } from 'react';
import axios from 'axios';

import ItemImages from "./itemimages.component"
import ItemInfo from "./iteminfo.component";
import ViewHistory from "./viewhistory.component";
import ViewFinance from "./viewfinance.component";
import ViewCurrentInfo from "./viewcurrentinfo.component";

export default class Items extends Component {
        constructor(props) {
            super(props);
            this.state = {
                fetchedItem: {
                    title: '',
                    category: '',
                    condition: '',
                    description: '',
                    image1: '',
                    image2: '',
                    image3: '',
                    tags: '',
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
                    needLicense: ''
                }
            } 
        }
        
        componentDidMount() {
            axios.get('http://localhost:5000/items/2')
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
    render() {
        return (
            <div className = "row">
                <div className = "col">
                    <ItemImages/><br/> 
                    <b>Tags: </b> {this.state.fetchedItem.tags}>
                    <br/>
                    <button type = "delete" className = "btn btn-primary btn-lg">Delete</button> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type = "edit" className = "btn btn-primary btn-lg">Edit</button>
                    
                </div>
                <div className = "col">
                    <ItemInfo/><br/> 
                    <ViewHistory/><br/>
                    <ViewFinance/><br/>
                    <ViewCurrentInfo/><br/>
                    <br/>
                    
                </div>
            </div>
        )
    }
}