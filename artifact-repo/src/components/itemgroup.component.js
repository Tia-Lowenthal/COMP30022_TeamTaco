import React, { Component } from 'react';
import axios from 'axios';

const Item = props => (
    <tr>
        <td>{props.item.title}</td>
        <td>{props.item.category}</td>
        <td>{props.item.itemId}</td>
        <td>{props.item.userId}</td>
        {/*have to link to item page eventually*/}
    </tr>
)

export default class ItemGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], filtered: []};
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

    handleChange = (e) => {
        let currentList = this.state.items;
        let newList = [];

        if (e.target.value !== ""){
            newList = currentList.filter(item => {
                const lowerItem = item.title.toLowerCase();
                const lowerSearch = e.target.value.toLowerCase();
                return lowerItem.includes(lowerSearch);
            });
        } else{
            newList = currentList;
        }
        this.setState({filtered: newList});
        console.log(newList);
    }

    render() {
        return (
            <div>
                <input type="text" className="form-control" placeholder="Search..." onChange={this.handleChange}/>
                <br/>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>ID</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                    </table>
            </div>
        )
    }
}