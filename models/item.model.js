/* This file creates the item model schema.
- Written by Tia Lowenthal for COMP30022 IT Project*/


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    category: { type: String },
    subCategory: { type: String },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    title: { type: String, unique: true, required: true }, 
    description: { type: String },
    condition: { type: Number, enum: [1, 2, 3, 4, 5] },
    currentLocation: { type: String },
    needLicense: { type: Boolean },
    saleStatus: { type: String, enum: ['Not for sale', 'For sale', 'Sold'] },
    displayStatus: { type: String, enum: ['In storage', 'On display', 'Preparing for display']},
    accessRights: { type: Boolean },
    estimatedValue: { type: Number },
    estimatedValueCurrency: { type: String },
    valuer: { type: String },
    insuredValue: { type: Number },
    insurer: { type: String },
    certifiedAuthentic: { type: Boolean },
    placeOfOrigin: { type: String },
    yearOfOrigin: { type: Date },
    originalPrice: { type: Number },
    originalPriceCurrency: { type: String },
    dateAcquired: { type: Date },
    history: { type: String },
    owner: { type: String },
    tags: [ String ],
    images: [ String ]
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;