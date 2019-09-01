const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemTagSchema = new Schema({
    itemTagId: { type: Number, required = true, unique = true },
    itemId: { type: String, required = true, unique = true },
    tagId: { type: Number, required = true, unique = true },
}, {
    timestamps: true
})

const ItemTag = mongoose.model('ItemTag', itemTagSchema);
module.exports = ItemTag;