/* This component (iteminfo.component.js) displays the primary information of an item on individual item page
    - Written by Julia Zhang, for COMP30022 IT Project
*/

import React, { Component } from 'react';
import axios from 'axios';
import './items.component.css';

export default class ItemInfo extends Component {
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
                needLicense: '',
                itemId: ''
            }
        } 
    }
    
    // retrieved data from backend for item
    componentDidMount() {
        console.log(this.props.currentItemId)
        axios.get('/items/'+ this.props.currentItemId)
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
        {/* display title, category, description of item*/}
        return (  
            <div className = "infobox">
                <h4> {this.state.fetchedItem.title} </h4>
                <i>{this.state.fetchedItem.category}</i>
                <br/><br/>
                <p> {this.state.fetchedItem.description} </p>
           </div>
        )
    }
    
}


