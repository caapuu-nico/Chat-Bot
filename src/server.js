const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const Product = require("./models/Product.js");
const Order = require("./models/Order.js");
const router = require("./routes/index.js")

const server = express();
const PORT = 4000;

//Middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));




//Routes
server.use("/api",router);
// Base de datos conexion
mongoose.connect("mongodb://127.0.0.1/chatbotdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("Conectado a MongoDb"))
.catch(err=> console.log("Error al conectar a MongoDb", err));
// Iniciar el servidor
server.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
const cargarProductos = async () => {
    const productsPath = path.join(__dirname, "db.json");

    const data = fs.readFileSync(productsPath, "utf-8");
    const products = JSON.parse(data);

    for(let producto of products){
        const productoExiste = await Product.findOne({name: producto.name});
        if(!productoExiste){
            await Product.create(producto);
            console.log(`Producto ${producto.name} creado correctamente`)
        }
    }
}
cargarProductos();

module.exports = server ;