import React, { Component } from 'react';

import UploadForm from "./uploadform.component";
import Navbar from "./navbar.component";

export default class Upload extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h3>Upload Item</h3>
                <UploadForm/>
            </div>
        )
    }
}