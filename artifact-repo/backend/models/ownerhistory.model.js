const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerHistorySchema = new Schema({
    ownerId: { type: Number, required = true, unique = true },
    itemId: {type: String, required = true, unique = true },
    ownedFrom: { type: Date },
    ownedUntil: { type: Date }
}, {
    timestamps: true
})

const OwnerHistory = mongoose.model('OwnerHistory', ownerHistorySchema);
module.exports = OwnerHistory;