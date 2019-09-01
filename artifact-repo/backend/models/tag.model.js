const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagId: { type: Number, required = true, unique = true },
    tagName: { type: String, required = true, unique = true },
}, {
    timestamps: true
})

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;