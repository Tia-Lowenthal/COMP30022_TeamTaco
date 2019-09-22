import React, { Component } from 'react';
import toBoolean from 'validator/lib/toBoolean';
import toInt from 'validator/lib/toInt';

export default class Upload extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            category: '',
            condition: '',
            description: '',
            image: '',
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

    handleChange = (e) => {
        if (e.target.name === "certifiedAuthentic" || e.target.name === "needLicense"){
            this.setState({[e.target.name]: toBoolean(e.target.value, false)});
        }
        else if (e.target.name === "condition"){
            this.setState({[e.target.name]: toInt(e.target.value, false)});
        }
        else{
            this.setState({[e.target.name]: e.target.value});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            title: this.state.title,
            category: this.state.category,
            condition: this.state.condition,
            description: this.state.description,
            image: this.state.image,
            tags: this.state.tags,
            placeOfOrigin: this.state.placeOfOrigin,
            yearOfOrigin: this.state.yearOfOrigin,
            dateAcquired: this.state.dateAcquired,
            originalPrice: this.state.originalPrice,
            history: this.state.history,
            certifiedAuthentic: this.state.certifiedAuthentic,
            estimatedValue: this.state.estimatedValue,
            valuer: this.state.valuer,
            insuredValue: this.state.insuredValue,
            insurer: this.state.insurer,
            currentLocation: this.state.currentLocation,
            saleStatus: this.state.saleStatus,
            displayStatus: this.state.displayStatus,
            needLicense: this.state.needLicense,
        };

        console.log(newItem);

        window.location = '/';

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
                                <option>Category1</option>
                                <option>Category2</option>
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
                        <label>Image</label>
                        <input type="file" className="form-control-file" name="image" value={this.state.image} onChange={this.handleChange}></input>
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
                                    <input type="text" className="form-control" name="originalPrice" value={this.state.originalPrice} placeholder="Enter original price..." onChange={this.handleChange}/>
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
                                    <input type="text" className="form-control" name="estimatedValue" value={this.state.estimatedValue} placeholder="Enter estimated value" onChange={this.handleChange}/>
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
                                    <input type="text" className="form-control" name="insuredValue" value={this.state.insuredValue} placeholder="Enter insured value..." onChange={this.handleChange}/>
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