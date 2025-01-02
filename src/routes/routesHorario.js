const { Router } = require("express");
const moment = require("moment");
moment.locale("es");
const router = Router();

const horario ={
  martesASabados:{
      apertura: "11:00",
      cierre: "23:30" 
  },
  domingo:{
      apertura: "17:00",
      cierre: "23:30"
  },
  lunes:{
      cerrado: true
  }
}
const verificarHorario = () => {
  const ahora = moment();
  const dia = ahora.format("dddd");  // Nombre del dia
  const horaActual = ahora.format("HH:mm")
  if(dia === "lunes" && horario.lunes.cerrado){
    return false
  }

  let horarioHoy;
  if(["martes","miercoles","jueves","viernes","sabado"].includes(dia)){
    horarioHoy = horario.martesASabados;
  }else if(dia === "domingo"){
    horarioHoy = horario.domingo
  }
  return horaActual >= horarioHoy.apertura && horaActual <= horarioHoy.cierre;
 
};

router.get('/abierto', (req, res) => {
    const abierto = verificarHorario();
    const ahora = moment();
    const dia = ahora.format('dddd');
  
    let horarioHoy;
    if(["martes", "miercoles","jueves","viernes","sabado"].includes(dia)){
      horarioHoy = horario.martesASabados;
  }else if (dia ==="domingo"){
      horarioHoy = horario.domingo
  }else if(dia === "lunes" && horario.lunes.cerrado){
    return res.send("Lo siento estamos cerrados hoy Lunes")
  }else{
    horarioHoy ={
      apertura:"Cerrado",
       cierre:"Cerrado"
      }
  }
    if (abierto) {
      res.send(`¡Sí, estamos abiertos! Nuestro horario de hoy es de ${horarioHoy.apertura} a ${horarioHoy.cierre}.`);
    } else {
      res.send(`Lo siento, estamos cerrados en este momento. Nuestro horario de hoy es de ${horarioHoy.apertura} a ${horarioHoy.cierre}.`);
  }})
  
  module.exports = router