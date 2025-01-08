const {Router} = require("express");
const router = Router();
const routesMenu = require("./routesMenu");
const routesPedidos = require("./routesPedidos")
const routesHorario = require("./routesHorario")
router.get("/",(req,res)=>{
    res.send("Inicio")
})
router.get("/menu",routesMenu);
router.post("/pedidos",routesPedidos);
router.get("/pedidos",routesPedidos);
router.get("/abierto",routesHorario);

module.exports = router;