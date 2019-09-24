const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagId: { type: String, unique: true, required: true },
    tagName: { type: String, unique: true, required: true },
}, {
    timestamps: true
})

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;