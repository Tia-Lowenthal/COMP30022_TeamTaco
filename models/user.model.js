const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String },
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    dob: { type: Date },
    userType: { type: String }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;