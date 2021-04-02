const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    codUtente: {
        type: String,
        required: true
    },
    onBoarded: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;