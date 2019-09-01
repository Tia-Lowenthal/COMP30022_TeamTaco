const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    ownerId: { type: Number, required = true, unique = true },
    firstName: { type: String, required = true},
    lastName: { type: String }
}, {
    timestamps: true
})

const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;