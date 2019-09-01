const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemId: { type: String, required = true, unique = true },
    userId: { type: String, required = true, unique = true },
    subCatId: { type: String, required = true, unique = true },
    sizeAttributesId: { type: String, required = true, unique = true },
    title: { type: String, required = true },
    description: { type: Date },
    condition: { type: Number },
    dateUploaded: { type: Date, required = true }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;