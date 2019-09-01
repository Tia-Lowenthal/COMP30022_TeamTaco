const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCurrentInfoSchema = new Schema({
    itemCurrentInfoId: { type: Number, required = true, unique = true },
    itemId: { type: String, required = true, unique = true },
    currentLocation: { type: String },
    needLicense: { type: Boolean },
    saleStatus: { type: String, enum: ['not for sale', 'for sale', 'sold'] },
    displayStatus: { type: String, enum: ['in storage', 'displayed']},
    accessRights: { type: Boolean }
}, {
    timestamps: true
})

const ItemCurrentInfo = mongoose.model('ItemCurrentInfo', itemCurrentInfoSchema);
module.exports = ItemCurrentInfo;


