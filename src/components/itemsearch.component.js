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

export default class ItemSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], 
                    filtered: [], 
                    searchQuery:'', 
                    categoryFilters: [ "photoCheck",
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
                                       "miscCheck"
                                    ]};
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
        ]
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

    categorySearch(categoryText) {
        var i;
        for (i = 0; i < this.categoryOptions.length; i++){
            // checks if the inputted category is in the array of active category filters
            if (this.categoryOptions[i].text.toLowerCase() === categoryText.toLowerCase()){
                if (this.state.categoryFilters.includes(this.categoryOptions[i].id)){
                    return true;
                }
            }
        }
        return false;
    }

    handleSearchBar = (e) => {
        this.setState({searchQuery: e.target.value.toLowerCase()});
    }

    handleSearchClick = (e) => {
        let currentList = this.state.items;
        let newList = [];

        console.log(this.state.categoryFilters);

        if (this.state.searchQuery !== ""){
            newList = currentList.filter(item => {
                const lowerTitle = item.title.toLowerCase();
                return (lowerTitle.includes(this.state.searchQuery));
            });
        } else{
            newList = currentList;
        }
        newList = newList.filter(item => {
            if ("category" in item){
                if (this.categorySearch(item.category)){
                    return true;
                } else{
                    return false;
                }
            }
            return true;
        })
        this.setState({filtered: newList});
    }

    handleClearClick = (e) => {
        var i;
        for (i = 0; i < this.categoryOptions.length; i++){
            document.getElementById(this.categoryOptions[i].id).checked = true;
        }
        this.setState({filtered: this.state.items, 
                        searchQuery: '',
                        categoryFilters: [ "photoCheck",
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
                                       "miscCheck"
                                    ]
                        });
    }

    handleCategoryClick = (e) => {
        if (e.target.checked){
            this.setState({categoryFilters: this.state.categoryFilters.concat(e.target.id)});
        }
        else{
            this.setState({categoryFilters: this.state.categoryFilters.filter(function(cat) {
                return cat !== e.target.id;})
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