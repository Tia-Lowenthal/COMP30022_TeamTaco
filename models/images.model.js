/* This file creates the image model schema.
- Written by Tia Lowenthal for COMP30022 IT Project*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    itemId: { type: String, required: true },
    images: { type: String, required: true }
}, {
    timestamps: true
})

const Images = mongoose.model('Images', imagesSchema);
module.exports = Images;