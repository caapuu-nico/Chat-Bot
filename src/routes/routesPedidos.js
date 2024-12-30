const {Router}= require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = Router();

router.post("/pedidos", async(req, res)=> {
    const {items} = req.body;
    try{
        //Calculo pedido
        let total = 0
        for(const item of items){
            const product = await Product.findById(item.product);
            total += product.price * item.quantity;
        }
        //Creacion pedido
        const newOrder = new Order({
            items,
            total,
        });
        await newOrder.save();

        res.status(201).json(newOrder);
    }catch(error){
        res.status(500).json({error})
    }
})
module.exports = router;