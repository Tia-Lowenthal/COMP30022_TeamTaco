const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    subCatId: { type: Number, required = true, unique = true },
    catId: { type: Number, required = true, unique = true },
    subCatName: { type: String, required = true }
}, {
    timestamps: true
});

const subCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = subCategory;