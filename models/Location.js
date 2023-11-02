const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({

    estateName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    floor: { 
        type: Number,
        required: true,
    },
    units:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Location", locationSchema)