import React, { Component } from 'react';

import ViewHistory from "./viewhistory.component";
import ViewFinance from "./viewfinance.component";
import ViewCurrentInfo from "./viewcurrentinfo.component";

export default class ItemTest extends Component {
    render() {
        return (
            <div class = "container">
                <ViewHistory/>
                <ViewFinance/>
                <ViewCurrentInfo/>
            </div>
        )
    }
}