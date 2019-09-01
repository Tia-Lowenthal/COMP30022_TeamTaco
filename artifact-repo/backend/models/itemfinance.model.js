const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemFinanceSchema = new Schema({
    itemFinanceId: { type: Number, required = true, unique = true },
    itemId: { type: String, required = true, unique = true },
    estimatedValue: { type: Decimal128 },
    valuer: { type: String },
    insuredValue: { type: Decimal128 },
    insurer: { type: String },
    certifiedAuthentic: { type: Boolean }
}, {
    timestamps: true
})

const ItemFinance = mongoose.model('ItemFinance', itemFinanceSchema);
module.exports = ItemFinance;