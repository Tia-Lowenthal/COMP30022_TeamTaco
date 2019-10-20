import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './itemsearch.component.css';
import placeholder from "./Assets/placeholder.jpg";


const Item = props => (
    <div className="item-tile"><Link to= {`/items/${props.item.itemId}`}>
        <div className="tile-image">
            <img src={props.image}/>
        </div>
        <div className="item-title">{props.item.title}</div>
        <i className="tile-cat">{props.item.category}</i>   
        <div className="tile-desc">{props.item.description}</div>
        <br/>
        </Link>
    </div>
)

const CategoryOptionRender = props => (
    <div>
        <input className="form-check-input" type="checkbox" value="" defaultChecked={true} onClick={props.handleClick} id={props.id}/>
        <label className="form-check-label" htmlFor={props.id}>
        {props.text}
        </label>
    </div>
)

const PriceOptionRender = props => (
    <div>
        <input className="form-check-input" type="checkbox" value="" defaultChecked={true} onClick={props.handleClick} id={props.id}/>
        <label className="form-check-label" htmlFor={props.id}>
        {props.id}
        </label>
    </div>
)

const TagOptionRender = props => (
    <div>
        <input className="form-check-input" type="checkbox" value="" defaultChecked={true} onClick={props.handleClick} id={props.id}/>
        <label className="form-check-label" htmlFor={props.id}>
        {props.id}
        </label>
    </div>
)

export default class ItemSearch extends Component {
    constructor(props) {
        super(props);
        this.categoryChecks = [
            "photoCheck",
            "jewelleryCheck",
            "kitchenwareCheck",
            "clothesCheck",
            "collectiblesCheck",
            "artCheck",
            "instrumentCheck",
            "furnitureCheck",
            "weaponsCheck",
            "officialDocsCheck",
            "personalDocsCheck",
            "miscCheck"];
        this.priceChecks = ["$0-100", "$101-500", "$501-1000", "$1000+", "Unknown Value"];
        this.searchTypes = ["Title", "Category", "Description", "CurrentLocation", "PlaceOfOrigin", "History", "Tags"];
        this.state = {items: [], 
                    filtered: [], 
                    searchQuery:'',
                    searchType: "Title", 
                    categoryFilters: [...this.categoryChecks],
                    priceFilters: [...this.priceChecks],
                    tagOptions: [],
                    tagFilters: []};
        this.categoryOptions = [
            {id: "photoCheck", text: "Photos"},
            {id: "jewelleryCheck", text: "Jewellery"},
            {id: "kitchenwareCheck", text: "Kitchenware"},
            {id: "clothesCheck", text: "Clothes"},
            {id: "collectiblesCheck", text: "Collectibles"},
            {id: "artCheck", text: "Art"},
            {id: "instrumentCheck", text: "Musical Instruments"},
            {id: "furnitureCheck", text: "Furniture"},
            {id: "weaponsCheck", text: "Weapons"},
            {id: "officialDocsCheck", text: "Official Documents"},
            {id: "personalDocsCheck", text: "Personal Documents"},
            {id: "miscCheck", text: "Miscellaneous"}
        ];
    }

    componentDidMount() {
        axios.get('/items/')
         .then(response => {
            this.setState({items: response.data, filtered : response.data});
         })
         .catch((error) => {
            console.log(error);
         })

         
         axios.get('/tags/')
         .then(response => {
            var allTags = response.data.map(dbTag => dbTag.tagName);
            allTags = allTags.concat(["Untagged Items"]);
            this.setState({tagOptions: [...allTags], tagFilters: [...allTags]});
         })
         .catch((error) => {
            console.log(error);
         })
    }

    itemList() {
        return this.state.filtered.map(currentitem => {
            if(currentitem.images.length >0){
                return <Item item={currentitem} key={currentitem.itemId} image={currentitem.images[0]}/>;
            }
            else{
                return <Item item={currentitem} key={currentitem.itemId} image={placeholder}/>;
            }
        })
    }

    // checks if the inputted category is in the array of active category filters
    categorySearch(categoryText) {
        var i;
        for (i = 0; i < this.categoryOptions.length; i++){
            if (this.categoryOptions[i].text.toLowerCase() === categoryText.toLowerCase()){
                if (this.state.categoryFilters.includes(this.categoryOptions[i].id)){
                    return true;
                }
            }
        }
        return false;
    }

    priceBracket(price) {
        if (price <= 100){
            return "$0-100";
        } else if (price <= 500) {
            return "$101-500";
        } else if (price <= 1000) {
            return "$501-1000";
        } else {
            return "$1000+";
        }
    }

    // finds the price bracket of an item and indicates if it is in an active price filter
    priceSearch(item) {
        if (!("estimatedValue" in item)){
            if ("originalPrice" in item){
                return (this.state.priceFilters.includes(this.priceBracket(item.originalPrice)))
            }
            return (this.state.priceFilters.includes("Unknown Value"));
        }
        return (this.state.priceFilters.includes(this.priceBracket(item.estimatedValue)));
    }

    tagSearch(item) {
        if ("tags" in item && item.tags.length>0) {
            return item.tags.some(tag => this.state.tagFilters.includes(tag));
        }
        else {
            return this.state.tagFilters.includes("Untagged Items");
        }
    }

    handleSearchBar = (e) => {
        this.setState({searchQuery: e.target.value});
    }

    // handles clicking of the search button
    handleSearchClick = (e) => {
        let currentList = this.state.items;
        let currentSearchType = this.state.searchType.toLowerCase();
        let newList = [];
        // filter by title
        if (this.state.searchQuery !== ""){
            newList = currentList.filter(item => {
                if (currentSearchType in item) {
                    if (currentSearchType === "tags") {
                        return item.tags.includes(this.state.searchQuery);
                    } else {
                        var lowerType = item[currentSearchType].toLowerCase();
                        return (lowerType.includes(this.state.searchQuery.toLowerCase()));
                    }
                }
                else {
                    return false;
                }
                
            });
        } else{
            newList = currentList;
        }
        //filter by category
        newList = newList.filter(item => {
            if ("category" in item){
                if (this.categorySearch(item.category)){
                    return true;
                } else{
                    return false;
                }
            }
            return false;
        })
        //filter by price
        newList = newList.filter(item => this.priceSearch(item));
        //filter by tag
        newList = newList.filter(item => this.tagSearch(item));
        this.setState({filtered: newList});
    }

    // sets all checkboxes to either checked or unchecked
    handleCheckType(boolArg, filterType, event) {
        var i, optionArray, filterArray;
        if (filterType === "category") {
            optionArray = this.categoryOptions;
            filterArray = "categoryFilters";
            for (i = 0; i < optionArray.length; i++){
                document.getElementById(optionArray[i].id).checked = boolArg;
            }
            if (boolArg) {
                this.setState({[filterArray] : [...this.categoryChecks]});
            }
            else {
                this.setState({[filterArray] : []});
            }
        } else {
            if (filterType === "price") {
                optionArray = this.priceChecks;
                filterArray = "priceFilters";
            } else if (filterType === "tag") {
                optionArray = this.state.tagOptions;
                filterArray = "tagFilters";
            }
            for (i = 0; i < optionArray.length; i++){
                document.getElementById(optionArray[i]).checked = boolArg;
            }
            if (boolArg) {
                this.setState({[filterArray] : [...optionArray]});
            }
            else {
                this.setState({[filterArray] : []});
            }
        } 
    }

    handleAllChecks(boolArg, e) {
        this.handleCheckType(boolArg, "category", e);
        this.handleCheckType(boolArg, "price", e);
        this.handleCheckType(boolArg, "tag", e);
    }

    handleClearClick = (e) => {
        this.handleAllChecks(true, e);
        this.setState({filtered: this.state.items, searchQuery: '', searchType: "Title"});
    }

    // handles category checkboxes
    handleCategoryClick = (e) => {
        if (e.target.checked){
            this.setState({categoryFilters: this.state.categoryFilters.concat(e.target.id)});
        } else{
            this.setState({categoryFilters: this.state.categoryFilters.filter(function(cat) {
                return cat !== e.target.id;})
            });
        }
    }

    // handles price checkboxes
    handlePriceClick = (e) => {
        if (e.target.checked){
            this.setState({priceFilters: this.state.priceFilters.concat(e.target.id)});
        } else{
            this.setState({priceFilters: this.state.priceFilters.filter(function(price) {
                return price !== e.target.id;})
            });
        }
    }

    handleTagClick = (e) => {
        if (e.target.checked){
            this.setState({tagFilters: this.state.tagFilters.concat(e.target.id)});
        } else{
            this.setState({tagFilters: this.state.tagFilters.filter(function(tag) {
                return tag !== e.target.id;})
            });
        }
        console.log(this.state.tagFilters);
    }

    handleSearchTypeChange = (e) => {
        this.setState({searchType: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-5">
                            <input type="text" className="form-control" placeholder="Search..." value={this.state.searchQuery} onChange={this.handleSearchBar}/>
                        </div>
                        <div className="col-2">
                            <select className="form-control" name="searchType" value={this.state.searchType} onChange={this.handleSearchTypeChange}>
                                {this.searchTypes.map(currentSearchType => {
                                    return (<option key={currentSearchType}>{currentSearchType}</option>)
                                })}
                            </select>
                            <small className="field">* field to search by</small>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                            <button className="filter" type="button" id="filters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Filters
                            </button>
                            <div className="dropdown-menu">
                                <form className="px-3 py-3">
                                <button className="clear-button" type="button" data-toggle="collapse" data-target="#categoryCollapse" aria-expanded="false" aria-controls="categoryCollapse">
                                    By Category
                                </button>
                                <div className="form-check collapse py-3" id="categoryCollapse">
                                {this.categoryOptions.map(currentCategory => {
                                    return <CategoryOptionRender id={currentCategory.id} key={currentCategory.id} text={currentCategory.text} handleClick={this.handleCategoryClick}/>;
                                })}
                                <div className="dropdown-divider"></div>
                                <p><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(true, "category", e)}>Check All</button></p>
                                <div><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(false, "category", e)}>Uncheck All</button></div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="clear-button" type="button" data-toggle="collapse" data-target="#priceCollapse" aria-expanded="false" aria-controls="priceCollapse">
                                    By Value
                                </button>
                                <div className="form-check collapse py-3" id="priceCollapse">
                                {this.priceChecks.map(currentPrice => {
                                    return <PriceOptionRender id={currentPrice} key={currentPrice} handleClick={this.handlePriceClick}/>;
                                })}
                                <div className="dropdown-divider"></div>
                                <p><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(true, "price", e)}>Check All</button></p>
                                <div><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(false, "price", e)}>Uncheck All</button></div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="clear-button" type="button" data-toggle="collapse" data-target="#tagCollapse" aria-expanded="false" aria-controls="tagCollapse">
                                    By Tags
                                </button>
                                <div className="form-check collapse py-3" id="tagCollapse">
                                {this.state.tagOptions.map(currentTag => {
                                    return <TagOptionRender id={currentTag} key={currentTag} handleClick={this.handleTagClick}/>;
                                })}
                                <div className="dropdown-divider"></div>
                                <p><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(true, "tag", e)}>Check All</button></p>
                                <div><button type="button" className="btn btn-light btn-sm btn-block" onClick={(e) => this.handleCheckType(false, "tag", e)}>Uncheck All</button></div>
                                </div>
                                
                                </form>
                            </div>
                            </div>
                        </div>
                        <div className="col"></div>
                        <div className="col">
                            <button type="button" className="search-button" onClick={this.handleSearchClick}>Search</button>
                        </div>
                        <div className="col">
                            <button type="button" className="clear-button" onClick={this.handleClearClick}>Clear Search</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', gridAutoRows: 'minMax(100px, auto)'}}>
                    {this.itemList()}
                </div>
            </div>
        )
    }
}