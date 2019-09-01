const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catId: { type: Number, required = true, unique = true },
    catatName: { type: String, required = true }
}, {
    timestamps: true
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;