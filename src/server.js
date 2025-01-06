const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
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

module.exports = server ;