import React, { Component } from 'react';
import axios from 'axios';

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
            <div className = "infobox">
                {this.state.fetchedItem.category} <br/>
                
                <h4> {this.state.fetchedItem.title} </h4>
        
                <p> {this.state.fetchedItem.description} </p>
           </div>
        )
    }
    
}


