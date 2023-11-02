const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    transactionId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unitsPurchased: {
        type: Number,
        required: true,
    },

},
{ timestamps: true },
)

module.exports = mongoose.model('Transactions', transactionSchema)
