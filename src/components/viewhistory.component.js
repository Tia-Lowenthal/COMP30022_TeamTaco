import React, { Component } from 'react';
import axios from 'axios';


export default class ViewHistory extends Component {
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
        axios.get('http://localhost:5000/items/1')
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
            <div>
                 <div><button className="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#historycollapse" aria-expanded="true" aria-controls="historycollapse">
                     History
                 </button>
                 </div>
                 <div className="collapse" id="historycollapse">
                     <ul className="list-group list-group-flush">
                     <li className="list-group-item"> <b>Place of Origin:</b> {this.state.fetchedItem.placeOfOrigin}</li>
                     <li className="list-group-item"> <b>Year of Origin:</b> {this.state.fetchedItem.yearOfOrigin}</li>
                     <li className="list-group-item"> <b>Original Price:</b> {this.state.fetchedItem.originalPrice}</li>
                     <li className="list-group-item"> <b>Date Aqcuired:</b> {this.state.fetchedItem.dateAcquired}</li>
                     <li className="list-group-item"> <b>History:</b> {this.state.fetchedItem.history}</li>
                     </ul>
                 </div>
            </div>
        )
    }
}