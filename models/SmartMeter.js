const mongoose = require('mongoose')

const meterSchema = mongoose.Schema({

    Location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    meterId: {
        type: String,
        required: true,
    },
    meterSerialNumber: {
        type: String,
        required: true,
    },
    meterModel: {
        type: String,
        required: true,
    },
    installationDate: {
        type: Date.now(),
        required: true,
    },
    firmwareVersion: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Meter', meterSchema)