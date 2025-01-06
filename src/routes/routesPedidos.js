const {Router}= require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = Router();

router.post("/pedidos", async(req, res)=> {
    try{
        const {items} = req.body;
        //Calculo pedido
        let total = 0
        const orderItems = await Promise.all(items.map(async (i)=>{
            const product = await Product.findById(i.product);
            if(!product){
                return res.status(404).json({message: "Producto no encontrado"});
            }
            total += product.price * i.quantity;
            return {
                product: product._id,
                quantity: i.quantity,
            }
        }));    
        //Creacion pedido
        const newOrder = new Order({
            items: orderItems,
            total
        });
        await newOrder.save();

        res.status(201).json(newOrder);
    }catch(error){
        res.status(500).json({error})
    }
})
module.exports = router;