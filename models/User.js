const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    street: {
        type: String, // Combined field for house number and street name
        required: [true, 'Please provide street'],
    },
    city: {
        type: String,
        required: [true, 'Please provide city'],
    },
    state: {
        type: String,
        required: [true, 'Please provide state'],
    },
    zipcode: {
        type: Number,
        required: [true, 'Please provide zipcode'],
        validate: {
            validator: function(value) {
                // Regex for US zip code pattern (5 digits)
                return /^\d{5}$/.test(value);
            },
            message: 'Please provide a valid US zip code'
        }
    }
});

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
