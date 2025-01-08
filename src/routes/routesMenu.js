const {Router}= require("express");
const Product = require("../models/Product");
const router = Router();

//Obtener menu

router.get("/menu", async(req, res)=>{
try{
    const {name} = req.query
    let product = await Product.findOne({ 
        name: new RegExp(name, 'i') 
    }); 
    if(name){
        name.length ?
        res.status(200).json(product) :
        res.status(404).send("Producto no encontrado")
    }else{
       let products = await Product.find();
        res.status(200).send(products)
    }
}catch(error){
    res.status(500).json({message: "Error al buscar productos", error : error.message})
}
});

module.exports = router;