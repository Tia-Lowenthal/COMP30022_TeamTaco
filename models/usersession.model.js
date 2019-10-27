/* This file creates the userSession model schema.
- Written by Karina Reyes for COMP30022 IT Project*/


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;