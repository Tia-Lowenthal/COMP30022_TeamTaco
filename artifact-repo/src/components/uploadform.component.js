import React, { Component } from 'react';

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
            originPlace: '',
            originAge: '',
            dateAcquired: '',
            originPrice: '',
            history: '',
            isAuthentic: '',
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
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group row">
                        <div class="col-6">
                            <label>Title (required)</label>
                            <input type="text" class="form-control" name="title" value={this.state.title} placeholder="Enter title..." onChange={this.handleChange} required/>
                        </div>
                        <div class="col-4">
                            <label>Category</label>
                            <select class="form-control" name="category" value={this.state.category} onChange={this.handleChange} required>
                                <option selected>Select category...</option>
                                <option>Category1</option>
                                <option>Category2</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <label>Condition</label>
                            <select class="form-control" name="condition" value={this.state.condition} onChange={this.handleChange}>
                                <option selected>Select rating...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control rounded-0" name="description" rows="3" value={this.state.description} onChange={this.handleChange}></textarea>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="file" class="form-control-file" name="image" value={this.state.image} onChange={this.handleChange}></input>
                    </div>
                    <div class="form-group">
                        <label>Tags</label>
                        <div class="form-row">
                            <div class="col-5"><input type="text" class="form-control" name="tags" placeholder="Enter tag name..."/></div>
                            <div class="col"><button type="button" class="btn btn-primary" value={this.state.tags} onChange={this.handleChange}>Input tag</button></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#historyformcollapse" aria-expanded="false" aria-controls="historyformcollapse">
                            History
                        </button>
                        <div class="collapse" id="historyformcollapse">
                            <div class="row">
                                <div class="col-6">
                                    <label>Place of origin</label>
                                    <input type="text" class="form-control" name="originPlace" value={this.state.originPlace} placeholder="Enter place of origin..." onChange={this.handleChange}/>
                                </div>
                                <div class="col-6">
                                    <label>Time of origin</label>
                                    <input type="text" class="form-control" name="originAge" value={this.state.originAge} placeholder="Enter time of origin..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-6">
                                    <label>Date acquired</label>
                                    <input type="text" class="form-control" name="dateAcquired" value={this.state.dateAcquired} placeholder="Enter date of acquiry..." onChange={this.handleChange}/>
                                </div>
                                <div class="col-6">
                                    <label>Original price</label>
                                    <input type="text" class="form-control" name="originPrice" value={this.state.originPrice} placeholder="Enter original price..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <label>History</label>
                                <textarea class="form-control rounded-0" name="history" value={this.state.history} rows="3" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#financeformcollapse" aria-expanded="false" aria-controls="financeformcollapse">
                            Valuation and Finance
                        </button>
                        <div class="collapse" id="financeformcollapse">
                            <div class="row">
                                <div class="col-4">
                                    <label>Certified authenticity</label>
                                    <select class="form-control" name="isAuthentic" value={this.state.isAuthentic} onChange={this.handleChange}>
                                        <option selected>Select if certified...</option>
                                        <option>Certified</option>
                                        <option>Not certified</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label>Estimated value</label>
                                    <input type="text" class="form-control" name="estimatedValue" value={this.state.estimatedValue} placeholder="Enter estimated value" onChange={this.handleChange}/>
                                </div>
                                <div class="col-4">
                                    <label>Valuer</label>
                                    <input type="text" class="form-control" name="valuer" value={this.state.valuer} placeholder="Enter name of valuer..." onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-6">
                                    <label>Insured value</label>
                                    <input type="text" class="form-control" name="insuredValue" value={this.state.insuredValue} placeholder="Enter insured value..." onChange={this.handleChange}/>
                                </div>
                                <div class="col-6">
                                    <label>Insurer</label>
                                    <input type="text" class="form-control" name="insurer" value={this.state.insurer} placeholder="Enter name of insurer..." onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#currentinfoformcollapse" aria-expanded="false" aria-controls="currentinfoformcollapse">
                            Current Info
                        </button>
                        <div class="collapse" id="currentinfoformcollapse">
                            <div>
                                <label>Current location</label>
                                <input type="text" class="form-control" name="currentLocation" value={this.state.currentLocation} placeholder="Enter current location..." onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-4">
                                    <label>Sale status</label>
                                    <select class="form-control" name="saleStatus" value={this.state.saleStatus} onChange={this.handleChange}>
                                        <option selected>Select sale status...</option>
                                        <option>Not for sale</option>
                                        <option>For sale</option>
                                        <option>Sold</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                <label>Display status</label>
                                    <select class="form-control" name="displayStatus" value={this.state.displayStatus} onChange={this.handleChange}>
                                        <option selected>Select display status...</option>
                                        <option>On display</option>
                                        <option>In storage</option>
                                        <option>Preparing for display</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label>License needed</label>
                                    <select class="form-control" name="needLicense" value={this.state.needLicense} onChange={this.handleChange}>
                                        <option selected>Select license option...</option>
                                        <option>No license required</option>
                                        <option>License required</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}