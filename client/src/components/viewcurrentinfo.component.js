import React, { Component } from 'react';

export default class ViewCurrentInfo extends Component {
    render() {
        return (
            <div>
                 <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#currentinfocollapse" aria-expanded="false" aria-controls="currentinfocollapse">
                     Current Info
                 </button>
                 <div class="collapse" id="currentinfocollapse">
                     <ul class="list-group list-group-flush">
                     <li class="list-group-item">Current location: (insert db value)</li>
                     <li class="list-group-item">License required: (insert db value)</li>
                     <li class="list-group-item">Sale status: (insert db value)</li>
                     <li class="list-group-item">Display status: (insert db value)</li>
                     <li class="list-group-item">Access rights: (insert db value)</li>
                     </ul>
                 </div>
            </div>
        )
    }
}