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

export default class ItemSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], filtered: [], searchQuery:''};
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

    handleSearchBar = (e) => {
        this.setState({searchQuery: e.target.value.toLowerCase()});
    }

    handleSearchClick = (e) => {
        let currentList = this.state.items;
        let newList = [];

        if (this.state.searchQuery !== ""){
            newList = currentList.filter(item => {
                const lowerTitle = item.title.toLowerCase();
                const lowerCategory = item.category.toLowerCase();
                return (lowerTitle.includes(this.state.searchQuery) || 
                        lowerCategory.includes(this.state.searchQuery));
            });
        } else{
            newList = currentList;
        }
        this.setState({filtered: newList});
        console.log(newList);
    }

    handleClearClick = (e) => {
        this.setState({filtered: this.state.items, searchQuery: ''});
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-6"><input type="text" className="form-control" placeholder="Search..." value={this.state.searchQuery} onChange={this.handleSearchBar}/></div>
                        <div className="col"><button type="button" className="btn btn-primary" onClick={this.handleSearchClick}>Search</button></div>
                        <div className="col"><button type="button" className="btn btn-outline-danger" onClick={this.handleClearClick}>Clear</button></div>
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