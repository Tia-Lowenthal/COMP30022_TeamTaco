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
                </form>
            </div>
        )
    }
}