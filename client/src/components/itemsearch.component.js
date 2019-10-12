import React, { Component } from 'react';
import axios from 'axios';

const Item = props => (
    <div>
        <h5>{props.item.title}</h5>
        <i>{props.item.category}</i>   
        <div>{props.item.description}</div>
        <br/>
        {/*have to link to item page eventually*/}
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
        this.priceChecks = ["$0-100", "$101-500", "$501-1000", "$1000+"];
        this.state = {items: [], 
                    filtered: [], 
                    searchQuery:'', 
                    categoryFilters: [...this.categoryChecks],
                    priceFilters: [...this.priceChecks]};
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
        axios.get('http://localhost:5000/items/')
         .then(response => {
           this.setState({items: response.data, filtered : response.data});
         })
         .catch((error) => {
            console.log(error);
         })
    }

    itemList() {
        return this.state.filtered.map(currentitem => {
          return <Item item={currentitem} key={currentitem.itemId}/>;
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
            return true;
        }
        return (this.state.priceFilters.includes(this.priceBracket(item.estimatedValue)));
    }

    handleSearchBar = (e) => {
        this.setState({searchQuery: e.target.value.toLowerCase()});
    }

    // handles clicking of the search button
    handleSearchClick = (e) => {
        let currentList = this.state.items;
        let newList = [];
        // filter by title
        if (this.state.searchQuery !== ""){
            newList = currentList.filter(item => {
                const lowerTitle = item.title.toLowerCase();
                return (lowerTitle.includes(this.state.searchQuery));
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
        this.setState({filtered: newList});
    }

    // sets all checkboxes to either checked or unchecked
    handleAllChecks(boolArg) {
        var i, j;
        for (i = 0; i < this.categoryOptions.length; i++){
            document.getElementById(this.categoryOptions[i].id).checked = boolArg;
        }
        for (j = 0; j < this.priceChecks.length; j++){
            document.getElementById(this.priceChecks[j]).checked = boolArg;
        }
        if (boolArg){
            this.setState({categoryFilters: [...this.categoryChecks], priceFilters: [...this.priceChecks]});
        } else {
            this.setState({categoryFilters: [], priceFilters: []});
        }
    }

    checkAll = (e) => {
        this.handleAllChecks(true);
    }

    checkNone = (e) => {
        this.handleAllChecks(false);
    }

    handleClearClick = (e) => {
        this.handleAllChecks(true);
        this.setState({filtered: this.state.items, searchQuery: ''});
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

    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-8">
                            <input type="text" className="form-control" placeholder="Search..." value={this.state.searchQuery} onChange={this.handleSearchBar}/>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="filters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Filters
                            </button>
                            <div className="dropdown-menu">
                                <form className="px-3 py-3">
                                <div className="form-check">
                                {this.categoryOptions.map(currentCategory => {
                                    return <CategoryOptionRender id={currentCategory.id} key={currentCategory.id} text={currentCategory.text} handleClick={this.handleCategoryClick}/>;
                                })}
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="form-check">
                                {this.priceChecks.map(currentPrice => {
                                    return <PriceOptionRender id={currentPrice} key={currentPrice} handleClick={this.handlePriceClick}/>;
                                })}
                                </div>
                                <div className="dropdown-divider"></div>
                                <div><button type="button" className="btn btn-dark btn-sm" onClick={this.checkAll}>Check All</button></div>
                                <div><button type="button" className="btn btn-secondary btn-sm" onClick={this.checkNone}>Check None</button></div>
                                </form>
                            </div>
                            </div>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-primary" onClick={this.handleSearchClick}>Search</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-outline-danger" onClick={this.handleClearClick}>Clear</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                    {this.itemList()}
                </div>
            </div>
        )
    }
}