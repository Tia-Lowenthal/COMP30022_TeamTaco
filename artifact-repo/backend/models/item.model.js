const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemId: { type: String },
    userId: { type: String },
    subCatId: { type: String  },
    sizeAttributesId: { type: String },
    title: { type: String}, 
    description: { type: Date },
    condition: { type: Number },
    dateUploaded: { type: Date}
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;