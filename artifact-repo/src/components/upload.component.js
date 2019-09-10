import React, { Component } from 'react';

import UploadForm from "./uploadform.component";

export default class Upload extends Component {
    render() {
        return (
            <div>
                <h3>Upload Item</h3>
                <UploadForm/>
            </div>
        )
    }
}