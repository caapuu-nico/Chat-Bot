const mongoose = require("mongoose");
const { create } = require("./Product");

const orderSchema = new mongoose.Schema({
    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ],
    total: Number,
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);
