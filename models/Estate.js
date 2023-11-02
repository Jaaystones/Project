const mongoose = require('mongoose')

const estateSchema = mongoose.Schema({

    Location: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },

    estateId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: { 
        type: String, 
        required: true
    },
    managerId: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    floor: { 
        type: Number, 
        required: true
    },
    unit:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Estate', estateSchema)