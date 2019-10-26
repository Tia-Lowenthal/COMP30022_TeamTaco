/* This component (viewcurrentinfo.component.js) displays the current information of the artifact on individual item page
    - Written by Julia Zhang, for COMP30022 IT Project
*/
import React, { Component } from 'react';
import axios from 'axios';

export default class ViewCurrentInfo extends Component {
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
    
    // retrieve item data from backend
    componentDidMount() {
        axios.get('/items/' + this.props.currentItemId)
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
                 <button className="item-expand" type="button" data-toggle="collapse" data-target="#currentinfocollapse" aria-expanded="false" aria-controls="currentinfocollapse">
                     Current Info
                 </button>
                 <div className="collapse" id="currentinfocollapse">
                     <ul className="list-group list-group-flush">
                     <li className="list-group-item"><b>Current location:</b> {this.state.fetchedItem.currentLocation}</li>
                     {this.state.fetchedItem.needLicense ? (
                         <li className="list-group-item"> <b>License required:</b> Yes</li>
                     ):(
                        <li className="list-group-item"> <b>License required:</b> No</li>
                     )}
                     <li className="list-group-item"> <b>Sale status:</b> {this.state.fetchedItem.saleStatus}</li>
                     <li className="list-group-item"> <b>Display status: </b> {this.state.fetchedItem.displayStatus}</li>
                     </ul>
                 </div>
            </div>
        )
    }
}