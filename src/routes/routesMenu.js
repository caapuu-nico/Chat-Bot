const {Router}= require("express");
const Product = require("../models/Product");
const router = Router();

//Obtener menu

router.get("/menu", async(req, res)=>{
try{
const products = await Product.find();
res.json(products);
}catch(error){
res.status(500).json({error:"Error no se obtiene menu"});
}
});

module.exports = router;