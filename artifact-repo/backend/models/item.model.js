const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    subCatId: { type: String },
    sizeAttributesId: { type: String },
    title: { type: String, required: true }, 
    description: { type: String },
    condition: { type: Number },
    dateUploaded: { type: Date },
    itemCurrentInfo: { type: String }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;