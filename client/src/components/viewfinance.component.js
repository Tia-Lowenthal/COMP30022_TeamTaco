import React, { Component } from 'react';
import axios from 'axios';

export default class ViewFinance extends Component {
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
                 <button className="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#financecollapse" aria-expanded="false" aria-controls="financecollapse">
                     Valuation and Finance
                 </button>
                 <div className="collapse" id="financecollapse">
                     <ul className="list-group list-group-flush">
                     <li className="list-group-item"> <b>Estimated value:</b> {this.state.fetchedItem.estimatedValue}</li>
                     <li className="list-group-item"> <b>Valuer: </b>{this.state.fetchedItem.valuer}</li>
                     <li className="list-group-item"> <b>Insured value: </b> {this.state.fetchedItem.insuredValue}</li>
                     <li className="list-group-item"> <b>Insurer: </b>{this.state.fetchedItem.insurer}</li>
                     <li className="list-group-item"> <b>Certified as authentic: </b> {this.state.fetchedItem.certifiedAuthentic}</li>
                     </ul>
                 </div>
            </div>
        )
    }
}