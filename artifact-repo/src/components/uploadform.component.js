import React, { Component } from 'react';

export default class Upload extends Component {
    render() {
        return (
            <div>
                <form>
                    <div class="form-group row">
                        <div class="col-6">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Enter title..."/>
                        </div>
                        <div class="col-4">
                            <label for="category">Category</label>
                            <select class="form-control" id="category">
                                <option selected>Select category...</option>
                                <option>Category1</option>
                                <option>Category2</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <label for="condition">Condition</label>
                            <select class="form-control" id="condition">
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
                        <label for="description">Description</label>
                        <textarea class="form-control rounded-0" id="description" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Image</label>
                        <input type="file" class="form-control-file" id="image"></input>
                    </div>
                    <div class="form-group">
                        <label for="tags">Tags</label>
                        <div class="form-row">
                            <div class="col-5"><input type="text" class="form-control" id="tags" placeholder="Enter tag name..."/></div>
                            <div class="col"><button type="button" class="btn btn-primary">Input tag</button></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-secondary btn-block" type="button" data-toggle="collapse" data-target="#historyformcollapse" aria-expanded="false" aria-controls="historyformcollapse">
                            History
                        </button>
                        <div class="collapse" id="historyformcollapse">
                            <div class="row">
                                <div class="col-6">
                                    <label for="originplace">Place of origin</label>
                                    <input type="text" class="form-control" id="originplace" placeholder="Enter place of origin..."/>
                                </div>
                                <div class="col-6">
                                    <label for="originage">Time of origin</label>
                                    <input type="text" class="form-control" id="originage" placeholder="Enter time of origin..."/>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-6">
                                    <label for="dateacquired">Date acquired</label>
                                    <input type="text" class="form-control" id="dateacquired" placeholder="Enter date of acquiry..."/>
                                </div>
                                <div class="col-6">
                                    <label for="originprice">Original price</label>
                                    <input type="text" class="form-control" id="originprice" placeholder="Enter original price..."/>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <label for="history">History</label>
                                <textarea class="form-control rounded-0" id="history" rows="3"></textarea>
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
                                    <label for="isAuthentic">Certified authenticity</label>
                                    <select class="form-control" id="isAuthentic">
                                        <option selected>Select if certified...</option>
                                        <option>Certified</option>
                                        <option>Not certified</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label for="estimatedvalue">Estimated value</label>
                                    <input type="text" class="form-control" id="estimatedvalue" placeholder="Enter estimated value"/>
                                </div>
                                <div class="col-4">
                                    <label for="valuer">Valuer</label>
                                    <input type="text" class="form-control" id="valuer" placeholder="Enter name of valuer..."/>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-6">
                                    <label for="insuredvalue">Insured value</label>
                                    <input type="text" class="form-control" id="insuredvalue" placeholder="Enter insured value..."/>
                                </div>
                                <div class="col-6">
                                    <label for="insurer">Insurer</label>
                                    <input type="text" class="form-control" id="insurer" placeholder="Enter name of insurer..."/>
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
                                <label for="currentloc">Current location</label>
                                <input type="text" class="form-control" id="currentloc" placeholder="Enter current location..."/>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col-4">
                                    <label for="salestatus">Sale status</label>
                                    <select class="form-control" id="salestatus">
                                        <option selected>Select sale status...</option>
                                        <option>Not for sale</option>
                                        <option>For sale</option>
                                        <option>Sold</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                <label for="displaystatus">Display status</label>
                                    <select class="form-control" id="displaystatus">
                                        <option selected>Select display status...</option>
                                        <option>On display</option>
                                        <option>In storage</option>
                                        <option>Preparing for display</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label for="needlicense">License needed</label>
                                    <select class="form-control" id="needlicense">
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