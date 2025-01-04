const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    photo_url:String,
});

module.exports = mongoose.model("Product", productSchema);

