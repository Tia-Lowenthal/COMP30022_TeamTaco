const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeAttributesSchema = new Schema({
    sizeAttributesId: { type: Number, required = true, unique = true },
    width: { type: Decimal128 },
    height: { type: Decimal128 },
    depth: { type: Decimal128 },
    weight: { type: Decimal128 }
}, {
    timestamps: true
});

const SizeAttributes = mongoose.model('SizeAttributes', sizeAttributesSchema);

module.exports = SizeAttributes;