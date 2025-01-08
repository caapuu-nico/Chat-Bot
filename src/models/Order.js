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
        }],
            customerName:{ 
                type: String, 
                required: true 
            },  // Nombre del cliente
            status: { 
                type: String, 
                default: 'Pendiente' 
            },  // Estado del pedido
            createdAt:{   
                type: Date,
                default: Date.now 
            },
            total: Number
});

module.exports = mongoose.model("Order", orderSchema);
