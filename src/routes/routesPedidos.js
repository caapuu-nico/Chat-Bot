const {Router}= require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = Router();

router.post("/pedidos", async(req, res)=> {
    try{
        const {products, customerName} = req.body;
        //Calculo pedido
        const orderItems = await Promise.all(products.map(async (item)=>{
            const product = await Product.findById(item.productId);
            if(!product){
                throw new Error(`Producto con ID ${item.productId} no existe.`);
            }
            return {
                productId: item.productId,
                quantity: item.quantity,
            }
        }));    
        //Creacion pedido
        const newOrder = new Order({
            products: orderItems,
            customerName: customerName 
            
        });
        await newOrder.save();
        res.status(201).json({ message: "Pedido creado exitosamente", order: newOrder });
    }catch(error){
        res.status(500).json({ message: "Error al crear el pedido", error: error.message });
    }
})
router.get("/pedidos", async (req, res) => {
    try {
      const orders = await Order.find().populate(); // Usar populate para obtener info de los productos
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los pedidos", error: error.message });
    }
  });


module.exports = router;