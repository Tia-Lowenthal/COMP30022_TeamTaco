/* This component (taggroup.component.js) renders an array of tags.
- Written by Shuzann Hoh for COMP30022 IT Project*/
import React, { Component } from 'react';

// renders tags in a form that can be interacted with
const EditTag = props => (
    <div className="btn-group" role="group">
        <button type="button" className="btn btn-light btn-sm" >{props.id}</button>
        <button type="button" className="btn btn-danger btn-sm" name={props.id} onClick={props.handleClick}>X</button>
    </div>
)

// renders non-interactive tags
const StaticTag = props => (
    <div className="btn-group" role="group">
        <button type="button" className="btn btn-light btn-sm" >{props.id}</button>
    </div>
)

export default class TagGroup extends Component {
    // displays all tags in a simple grid format
    render() {
        if (this.props.mode === "edit") {
            return (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridGap: '5px', gridAutoRows: 'minMax(10px, auto)'}}>
                    {this.props.tagArray.map(currentTag => {
                        return <EditTag id={currentTag} key={currentTag} handleClick={this.props.handleDeleteTag}/>;
                    })}
                </div>
            )
        } else {
            return (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '5px', gridAutoRows: 'minMax(10px, auto)'}}>
                    {this.props.tagArray.map(currentTag => {
                        return <StaticTag id={currentTag} key={currentTag} handleClick={this.props.handleDeleteTag}/>;
                    })}
                </div>
            )
        }
        
    }
}