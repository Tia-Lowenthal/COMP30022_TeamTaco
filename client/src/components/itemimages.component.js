/* This component (itemimages.component.js) displays item images on individual item page
    - Written by Karina Reyes and Julia Zhang, for COMP30022 IT Project
*/

import React, { Component } from 'react';
import axios from 'axios';
import placeholder from "./Assets/placeholder.jpg"



export default class ItemImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fetchedItem: {
                images: []
            }
        } 
    }
    
    componentDidMount() {
        this.getImages();
    }
    

    //retrieving images of item from backend
    getImages() {
        axios.get('/items/' + this.props.currentItemId)
        .then(response => {
            console.log("response", response);
            this.setState({
                fetchedItem: response.data[0],
                isLoading: false
            });
        console.log("fetchedItem", this.state.fetchedItem);
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        
        return (
            <div>
            {/*display images in carousel */}
            {!this.state.isLoading ? (
            <div>
            {this.state.fetchedItem.images.length>0 ? (
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {this.state.fetchedItem.images.length>1 && <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>}
                    {this.state.fetchedItem.images.length>=2 && <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>}
                    {this.state.fetchedItem.images.length===3 && <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={this.state.fetchedItem.images[0]} alt="First slide"/>
                    </div>
                    {this.state.fetchedItem.images.length>=2 && <div className="carousel-item">
                    <img className="d-block w-100" src={this.state.fetchedItem.images[1]} alt="Second slide"/>
                    </div>}
                    {this.state.fetchedItem.images.length===3 && <div className="carousel-item">
                    <img className="d-block w-100" src={this.state.fetchedItem.images[2]} alt="Second slide"/>
                    </div>}
                </div>
                {this.state.fetchedItem.images.length > 1 ? (<div> <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>) :(null)}
                </div>
            ) : (
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={placeholder} alt="First slide"/>
                    </div>
                </div>
            )}
            </div>
            ) : (null)}
            </div>
        )
    }
}