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