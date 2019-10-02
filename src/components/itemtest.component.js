import React, { Component } from 'react';

import ViewHistory from "./viewhistory.component";
import ViewFinance from "./viewfinance.component";
import ViewCurrentInfo from "./viewcurrentinfo.component";

export default class ItemTest extends Component {
    render() {
        return (
            <div class = "row">
                <div class = "col">
                    Carousel goes here<br/>
                    Tags: (tags go here)<br/>
                </div>
                <div class = "col">
                    Main info goes here
                    <ViewHistory/><br/>
                    <ViewFinance/><br/>
                    <ViewCurrentInfo/><br/>
                </div>
            </div>
        )
    }
}