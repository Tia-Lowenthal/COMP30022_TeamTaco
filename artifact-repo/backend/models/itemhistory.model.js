const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemHistorySchema = new Schema({
    itemHistoryId: { type: Number, required = true, unique = true },
    itemId: { type: String, required = true, unique = true },
    placeOfOrigin: { type: String },
    yearOfOrigin: { type: Date },
    originalPrice: { type: Number },
    dateAcquired: { type: Date },
    history: { type: String}
},{
    timestamps: true
});

const ItemHistory = mongoose.model('ItemHistory', itemHistorySchema);
module.exports = ItemHistory;



