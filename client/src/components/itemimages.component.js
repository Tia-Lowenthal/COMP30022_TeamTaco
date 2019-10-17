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
            images: []
        } 
    }
    
    componentDidMount() {
        this.getImages();
    }

    getImages() {
        axios.get('/images/' + this.props.currentItemId)
        .then(response => {
            console.log("response", response);
            this.setState({
                images: response.data,
                isLoading: false
            });
        console.log("fetchedItem", this.state.fetchedItem);
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const {isLoading, images} = this.state;
        return (
            <React.Fragment>
            <h2>Random Post</h2>
            <div>
                {!isLoading ? (
                images.map(image => {
                    const {images} = image;
                console.log("image path is", images)
                return (
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100" src={images} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src={image2} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src={image3} alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                )
                })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            </React.Fragment>
        ); 
    }
}