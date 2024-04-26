const mongoose = require('mongoose');

const FlowerSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:[true, 'Please provide flower name'],
        maxlength: [100, 'Flower name can not be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please Provide Flower Price'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [2000, 'Description can not be more than 2000 characters']
    },
    color: {
        type: String,
        required: [true, 'Please provide color']
    },
    occasion: {
        type: [String],
        required: [true, 'Please provide occasion'],
        enum: ['birthday', 'just because', 'valentines day']
    },
    recipient: {
        type: [String],
        required: [true, 'Please provide recipient'],
        enum: ['girlfriend', 'friend', 'mom']
    },
    feeling: {
        type: [String],
        required: [true, 'Please provide feeling'],
        enum: ['happiness', 'romance', 'sorrow']
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        requires:true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('Flower', FlowerSchema);