const mongoose = require("mongoose");
const { create } = require("./Product");

const orderSchema = new mongoose.Schema({
    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity: Number,
        }
    ],
    total: Number,
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
