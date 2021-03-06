/* This component (edit.component.js) handles the editing of individual artifacts.
- Written by Shuzann Hoh for COMP30022 IT Project, derived from upload.component.js*/
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import toBoolean from 'validator/lib/toBoolean';
import toInt from 'validator/lib/toInt';
import isInt from 'validator/lib/isInt';
import axios from 'axios';
import TagGroup from './taggroup.component';
import Navbar from "./navbar.component";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// renders user-set tags for selection
const TagOptionRender = props => (
    <div>
        <input className="form-check-input" type="checkbox" value="" onClick={props.handleClick} id={props.id}/>
        <label className="form-check-label" htmlFor={props.id}>
        {props.id}
        </label>
    </div>
)

// confirms when a successful item update is made
const VerifyUpdate = props => (
    <div className="row">
       New item successfully updated in the register!
       <div className="col-1"></div>
       <Link to= {'/items/'+props.itemId}>
            <button type = "button" className="search-button">Go to item</button>
       </Link>
       <div className="col-1"></div>
       <Link to= {'/home'}>
            <button type = "button" className="search-button">Return home</button>
       </Link>
    </div>
)

export default class Edit extends Component {
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
            images: [],
            tagBar: '',
            tagSelect: [],
            dbTags: [],
            tags: [],
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
            userId: "1",
            hasSent: false
        }
        this.bannedTags = ["Untagged Items", "Unknown Value", "tags", "title", "category", "condition", "description"];
    }

    // gets item and tag information from database
    componentDidMount() {
        axios.get('/tags/')
         .then(response => {
            this.setState({dbTags: response.data.map(dbTag => dbTag.tagName)});
         })
         .catch((error) => {
            console.log(error);
         })
         axios.get('/items/'+ this.props.match.params.itemId)
         .then(response => {
            this.setState(response.data[0]);
         })
         .catch((error) => {
            console.log(error);
         })
    }

    returnHome() {
        window.location = '/home';
    }

    // executes deletion of an item
    onDelete = () => {
        axios.delete('/items/'+ this.state.itemId)
            .then(response => {
                console.log("response", response);
                this.setState({
                fetchedItem: response.data[0]
        })});
        window.location = '/home';
    }

    // keeps track of what existing tags the user wishes to add
    handleTagClick = (e) => {
        if (e.target.checked){
            this.setState({tagSelect: this.state.tagSelect.concat(e.target.id)});
        } else{
            this.setState({tagSelect: this.state.tagSelect.filter(function(tag) {
                return tag !== e.target.id;})
            });
        }
    }

    // adds tags to the item and updates the display
    handleAddTag = (e) => {
        var j;
        let currentTags = [...this.state.tags];
        this.state.tagSelect.forEach((checkedTag) => {
            if (!this.state.tags.includes(checkedTag)){
                currentTags = currentTags.concat(checkedTag);
            }
        });
        if (this.state.tagBar !== '' && !this.state.tags.includes(this.state.tagBar) && !this.bannedTags.includes(this.state.tagBar)){
            currentTags = currentTags.concat(this.state.tagBar);
        }
        this.setState({tagBar: '', tagSelect: [], tags: currentTags});
        for (j = 0; j < this.state.dbTags.length; j++){
            document.getElementById(this.state.dbTags[j]).checked = false;
        }
    }

    // removes tag from the item
    handleDeleteTag = (e) => {
        if (this.state.tags.includes(e.target.name)){
            this.setState({tags: this.state.tags.filter(function(tag) {
                return tag !== e.target.name;})
            });
        }
    }

    // manages changes to field inputs
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
            var currImages= this.state.images;
            currImages.push(e.target.files[0]);
            this.setState({["images"]: currImages});
        } else{
            this.setState({[key]: val});
        }
    }

    // sends updated information to the database
    onSubmit = (e) => {
        e.preventDefault();

        var newItem = {};

        // only submit state attributes with given values
        Object.entries(this.state).forEach(([key, value]) => {
            if (key === "tags") {
                if (value.length > 0) {
                    newItem[key] = value;
                    value.forEach((tag) => {
                        if (!this.state.dbTags.includes(tag)){
                            var newTag = {};
                            newTag["tagName"] = tag;
                            axios.post('/tags/add', newTag).then(res => console.log(res.data));
                        }
                    })  
                }
            } else if (value !== '' && key !== "tagBar" && key !== "dbTags" && key !== "tagSelect" && key !== "hasSent"){
                newItem[key] = value;
            }
        })
        const postRoute = '../items/update/'+this.state.itemId;
        axios.post(postRoute, newItem).then((res) => {
            console.log(res.data);
            this.setState({hasSent : true});
        });

    }

    render() {
        return (
            <div>
                <Navbar/>
                <br/>
                <div className="upload-form">
                    <h3 className="heading">Edit Item</h3>
                    <button type = "delete" className = "search-button" onClick={this.onDelete}>Delete Item</button>
                <div className="row"></div>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Title (cannot edit)</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} placeholder="Enter title..." onChange={this.handleChange} required disabled/>
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
                        <label>Tags</label>
                        <div className="form-row">
                            <div className="col-5">
                            <div className="input-group">
                                <input type="text" className="form-control" name="tagBar" placeholder="Enter tag name..." value={this.state.tagBar} onChange={this.handleChange}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div className="dropdown-menu">
                                        <div className="form-check px-5">
                                            {this.state.dbTags.map(currentTag => {
                                                return <TagOptionRender id={currentTag} key={currentTag} handleClick={this.handleTagClick}/>;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col">
                            <button type="button" className="add-button" name="tagEnter" onClick={this.handleAddTag}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                            <TagGroup tagArray={this.state.tags} handleDeleteTag={this.handleDeleteTag} mode="edit"/>
                    </div>
                    <div className="form-group">
                        <button className="dropdown-upload" type="button" data-toggle="collapse" data-target="#historyformcollapse" aria-expanded="false" aria-controls="historyformcollapse">
                            History
                        </button>
                        <div className="collapse" id="historyformcollapse">
                            <div className="row">
                                <div className="col-6">
                                    <label>Place of origin</label>
                                    <input type="text" className="form-control" name="placeOfOrigin" value={this.state.placeOfOrigin} placeholder="Enter place of origin..." onChange={this.handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Date of origin</label>
                                    <input type="text" className="form-control" name="yearOfOrigin" value={this.state.yearOfOrigin} placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>Date acquired</label>
                                    <input type="text" className="form-control" name="dateAcquired" value={this.state.dateAcquired} placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
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
                        <button className="dropdown-upload" type="button" data-toggle="collapse" data-target="#financeformcollapse" aria-expanded="false" aria-controls="financeformcollapse">
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
                        <button className="dropdown-upload" type="button" data-toggle="collapse" data-target="#currentinfoformcollapse" aria-expanded="false" aria-controls="currentinfoformcollapse">
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
                    <div className="row">
                        <div className="col-2">
                        <button type="submit" className="add-button">Submit</button>
                        </div>
                        <div className="col">
                        {this.state.hasSent ? <VerifyUpdate itemId={this.state.itemId}/> : null}
                        </div>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}