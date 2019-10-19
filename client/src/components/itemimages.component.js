import React, { Component } from 'react';
import axios from 'axios';
import image1 from "./Assets/image1.jpg"
import image2 from "./Assets/image2.jpg"
import image3 from "./Assets/image3.jpg"


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
        )
    }
}