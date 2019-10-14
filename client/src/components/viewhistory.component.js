import React, { Component } from 'react';

export default class ViewHistory extends Component {
    render() {
        return (
            <div>
                 <div><button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#historycollapse" aria-expanded="true" aria-controls="historycollapse">
                     History
                 </button>
                 </div>
                 <div class="collapse" id="historycollapse">
                     <ul class="list-group list-group-flush">
                     <li class="list-group-item">Place of origin: (insert db value)</li>
                     <li class="list-group-item">Year of origin: (insert db value)</li>
                     <li class="list-group-item">Original price: (insert db value)</li>
                     <li class="list-group-item">Date acquired: (insert db value)</li>
                     <li class="list-group-item">History: (insert db value)</li>
                     </ul>
                 </div>
            </div>
        )
    }
}