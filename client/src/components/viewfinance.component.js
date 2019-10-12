import React, { Component } from 'react';

export default class ViewFinance extends Component {
    render() {
        return (
            <div>
                 <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#financecollapse" aria-expanded="false" aria-controls="financecollapse">
                     Valuation and Finance
                 </button>
                 <div class="collapse" id="financecollapse">
                     <ul class="list-group list-group-flush">
                     <li class="list-group-item">Estimated value: (insert db value)</li>
                     <li class="list-group-item">Valuer: (insert db value)</li>
                     <li class="list-group-item">Insured value: (insert db value)</li>
                     <li class="list-group-item">Insurer: (insert db value)</li>
                     <li class="list-group-item">Certified as authentic: (insert db value)</li>
                     </ul>
                 </div>
            </div>
        )
    }
}