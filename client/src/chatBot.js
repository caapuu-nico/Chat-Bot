import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Obtener el menú al cargar la página
    axios.get('http://localhost:4000/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('Error al obtener el menú', err));
  }, []);
  // const handleInputChange = (event) => {
  //   setMessage(event.target.value);
  // };
  const handleSendMessage = () => {
    // Verificar horario
    const lowerCaseMessage = message.toLowerCase();
    if(lowerCaseMessage.includes("estan") || lowerCaseMessage.includes("abiertos")) {
      axios.get("http://localhost:4000/api/abierto")
      .then((res)=>setResponse(res.data))
      .catch((err)=> console.error("Error al consultar horario", err))
    }else if(lowerCaseMessage.includes("horario") || lowerCaseMessage.includes("atencion")){
        const infoHorario = 
        `Nuestros horarios:
        -Martes a Sabados: de 11:30 a 23:30
        -Domingo: de 17:00 a 23:30
        -Lunes: Cerrado`;
        setResponse(infoHorario);
    }else if (lowerCaseMessage === 'menu') {
      // Mostrar el menú cuando se solicite
        const menuImage = menu.map(item=>({
          name:item.name,
          price:item.price,
          image:item.photo_url
        }));
        setResponse(menuImage)
        //Generar orden
    } else if  (lowerCaseMessage.toLowerCase().startsWith('ordenar')) {
      // Tomar pedido cuando el usuario lo solicite
      const productName = lowerCaseMessage.split(' ')[1];
      // const product = menu.find(item => item.name.toLowerCase() === productName.toLowerCase());
      axios.get(`http://localhost:4000/api/menu?name=${productName}`)
      .then((res)=>{
        const product = res.data
      if (product) {
        const newOrder = [...order, { 
            product: product._id,
             name: product.name 
            }];
        setOrder(newOrder);
        // Mandar pedido al servidor
        axios.post("http://localhost:4000/api/pedidos",{items: newOrder})
          .then((res) => setResponse(`Pedido realizado: ${newOrder.map(item => item.name).join(', ')}`))
          .catch((err) => console.error('Error al realizar el pedido', err));
      } else {
        setResponse('Producto no encontrado en el menú.');
      }
    })
    } 
    
  
    setMessage('');
  }

 //Enter
 const enterButton = (e)=> {
  if(e.key === "Enter"){
    handleSendMessage();
  }
}
  return (
    <div className="chatbot">
      <h1>Chatbot</h1>
      <div className="chat-window">
        {/*Mostrar menu*/}
        {Array.isArray(response) ? (
          <div className='menu'>
            {response.map((i, index)=>(
            <div key={index} className="menu-item">
              <img src={i.image} alt={i.name} style={{width: "100px", height: "100px"}} />
              <p key={index.id}>{i.name} - {i.price}</p>
              </div>
              ))
              }
              </div>
            ):(
              <p>{response}</p> //Texto normal
            )}
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyPress={enterButton}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
