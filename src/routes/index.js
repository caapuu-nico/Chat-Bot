const {Router} = require("express");
const router = Router();
const routesMenu = require("./routesMenu");
const routesPedidos = require("./routesPedidos")

router.get("/",(req,res)=>{
    res.send("Inicio")
})

router.get("/menu",routesMenu);
router.post("/pedidos",routesPedidos);

module.exports = router;