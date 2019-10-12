import React, { Component } from 'react';
import toBoolean from 'validator/lib/toBoolean';
import toInt from 'validator/lib/toInt';
import isInt from 'validator/lib/isInt';
import axios from 'axios';

function generateItemId(){
    var today = new Date();
    var date = parseInt(today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDate().toString());
    var time = parseInt(today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString());
    var dateTime = date+time;
    return dateTime.toString();
}

export default class Upload extends Component {
    constructor(){
        super();
        this.state = {
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
            itemId: '',
            userId: "1"
        }
    }

    handleChange = (e) => {
        let key = e.target.name;
        let val = e.target.value;
        if (key === "certifiedAuthentic" || key === "needLicense"){
            this.setState({[key]: toBoolean(val, false)});
        } else if (key === "condition"){
            this.setState({[key]: toInt(val, false)});
        } else if (key === "originalPrice" || key === "estimatedValue" || key === "insuredValue"){
            if (val === '') {
                this.setState({[key]: val});
            } else if (isInt(val.replace(/\D/g,''))){
                this.setState({[key]: toInt(val.replace(/\D/g,''), false)});
            }
        } else if (key === "image1" || key === "image2" || key === "image3") {
            this.setState({[key]: e.target.files[0]});
        } else{
            this.setState({[key]: val});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        var newItem = {};

        // Only submit state attributes with given values
        Object.entries(this.state).forEach(([key, value]) => {
            const generatedId = generateItemId();
            if (key === "itemId"){
                newItem[key] = generatedId;
            } else if (value !== '' && (key === "image1" || key === "image2" || key === "image3")) {
                let formData = new FormData();
                formData.append("images", value);
                formData.append("itemId", generatedId);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                axios.post('http://localhost:5000/images/add', formData, config).then(res => console.log(res.data));
            } else if (value !== ''){
                newItem[key] = value;
            }
        })

        axios.post('http://localhost:5000/items/add', newItem).then(res => console.log(res.data));

        /*window.location = '/';*/

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Title (required)</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} placeholder="Enter title..." onChange={this.handleChange} required/>
                        </div>
                        <div className="col-4">
                            <label>Category (required)</label>
                            <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange} required>
                                <option value="">Select category...</option>
                                <option>Photos</option>
                                <option>Jewellery</option>
                                <option>Kitchenware</option>
                                <option>Clothes</option>
                                <option>Collectibles</option>
                                <option>Art</option>
                                <option>Musical Instruments</option>
                                <option>Furniture</option>
                                <option>Weapons</option>
                                <option>Official Documents</option>
                                <option>Personal Documents</option>
                                <option>Miscellaneous</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label>Condition</label>
                            <select className="form-control" name="condition" value={this.state.condition} onChange={this.handleChange}>
                                <option value="">Select rating...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control rounded-0" name="description" rows="3" value={this.state.description} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Image 1</label>
                        <input type="file" className="form-control-file" name="image1" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Image 2</label>
                        <input type="file" className="form-control-file" name="image2" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Image 3</label>
                        <input type="file" className="form-control-file" name="image3" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <div className="form-row">
                            <div className="col-5"><input type="text" className="form-control" name="tags" placeholder="Enter tag name..."/></div>
                            <div className="col"><button type="button" className="btn btn-primary" value={this.state.tags} onChange={this.handleChange}>Input tag</button></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#historyformcollapse" aria-expanded="false" aria-controls="historyformcollapse">
                            History
                        </button>
                        <div className="collapse" id="historyformcollapse">
                            <div className="row">
                                <div className="col-6">
                                    <label>Place of origin</label>
                                    <input type="text" className="form-control" name="placeOfOrigin" value={this.state.placeOfOrigin} placeholder="Enter place of origin..." onChange={this.handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Year of origin</label>
                                    <input type="text" className="form-control" name="yearOfOrigin" value={this.state.yearOfOrigin} placeholder="Enter year of origin..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>Date acquired</label>
                                    <input type="text" className="form-control" name="dateAcquired" value={this.state.dateAcquired} placeholder="Enter date of acquiry..." onChange={this.handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Original price</label>
                                    <input type="text" className="form-control" name="originalPrice" value={this.state.originalPrice} placeholder="Enter original price ($)..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <label>History</label>
                                <textarea className="form-control rounded-0" name="history" value={this.state.history} rows="3" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#financeformcollapse" aria-expanded="false" aria-controls="financeformcollapse">
                            Valuation and Finance
                        </button>
                        <div className="collapse" id="financeformcollapse">
                            <div className="row">
                                <div className="col-4">
                                    <label>Certified authenticity</label>
                                    <select className="form-control" name="certifiedAuthentic" value={this.state.certifiedAuthentic} onChange={this.handleChange}>
                                        <option >Select if certified...</option>
                                        <option value="true">Certified</option>
                                        <option value="false">Not certified</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Estimated value</label>
                                    <input type="text" className="form-control" name="estimatedValue" value={this.state.estimatedValue} placeholder="Enter estimated value ($)..." onChange={this.handleChange}/>
                                </div>
                                <div className="col-4">
                                    <label>Valuer</label>
                                    <input type="text" className="form-control" name="valuer" value={this.state.valuer} placeholder="Enter name of valuer..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>Insured value</label>
                                    <input type="text" className="form-control" name="insuredValue" value={this.state.insuredValue} placeholder="Enter insured value ($)..." onChange={this.handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Insurer</label>
                                    <input type="text" className="form-control" name="insurer" value={this.state.insurer} placeholder="Enter name of insurer..." onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#currentinfoformcollapse" aria-expanded="false" aria-controls="currentinfoformcollapse">
                            Current Info
                        </button>
                        <div className="collapse" id="currentinfoformcollapse">
                            <div>
                                <label>Current location</label>
                                <input type="text" className="form-control" name="currentLocation" value={this.state.currentLocation} placeholder="Enter current location..." onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4">
                                    <label>Sale status</label>
                                    <select className="form-control" name="saleStatus" value={this.state.saleStatus} onChange={this.handleChange}>
                                        <option value="">Select sale status...</option>
                                        <option>Not for sale</option>
                                        <option>For sale</option>
                                        <option>Sold</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                <label>Display status</label>
                                    <select className="form-control" name="displayStatus" value={this.state.displayStatus} onChange={this.handleChange}>
                                        <option value="">Select display status...</option>
                                        <option>On display</option>
                                        <option>In storage</option>
                                        <option>Preparing for display</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>License needed</label>
                                    <select className="form-control" name="needLicense" value={this.state.needLicense} onChange={this.handleChange}>
                                        <option value="">Select license option...</option>
                                        <option value="false">No license required</option>
                                        <option value="true">License required</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}