const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, required = true, unique = true },
    email: { type: String, required = true, unique = true },
    password: { type: String, required = true },
    firstname: { type: String, required = true },
    lastname: { type: String, required = true },
    dob: { type: Date, required = true },
    userType: { type: Enum, required = true }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;