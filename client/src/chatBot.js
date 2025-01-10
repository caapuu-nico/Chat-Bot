import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
const Chatbot = () => {
  const [menu, setMenu] = useState([]);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [customerName, setCustomerName] =useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");



  useEffect(() => {
    // Obtener el menú al cargar la página
    axios.get('http://localhost:4000/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('Error al obtener el menú', err));
  }, []);
  const sendOrder = (product) => {
    // Asegurarse de que el nombre del cliente y el producto estén disponibles
    if (!customerName  || !street || !number || !city || !product) {
      alert("Por favor completa los campos para realizar el pedido");
      return;
    }
    // Crear el objeto del pedido
    const order = {
      customerName: customerName || "Cliente anonimo",
      street: street,
      number: number,
      city: city,
      products: [{ 
        productId: product.id,
         quantity: 1 }]  // Puedes ajustar la cantidad si es necesario
    };
    // Enviar la solicitud al backend para crear el pedido
    axios.post('http://localhost:4000/api/pedidos', order)
      .then(response => {
        console.log(response.data);  // Pedido exitoso
        alert(`Pedido creado exitosamente: ${product.name}`);
      })
      .catch(error => {
        console.log(product)
        console.error('Error al crear el pedido:', error);
        alert('Error al crear el pedido.');
        
      });
  };

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
          image:item.photo_url,
          id:item._id
        }));
        setResponse(menuImage)
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
    <div className="chatbot-container">
       <div className="chatbot-box">
      <h1 className="chatbot-title">Chatbot</h1>
      <div className="chat-window">
        {/*Mostrar menu*/}
        {Array.isArray(response) ? (         
          <div className="menu-items">
              <h2 className="menu-title">Menu</h2>
              <input 
              className="customer-input"
            type="text" 
            placeholder="Nombre del cliente" 
            value={customerName}
        onChange={(e) => setCustomerName(e.target.value)} 
      />
        <input 
            type="text" 
            placeholder="Calle" 
            value={street}
             className="customer-input"
        onChange={(e) => setStreet(e.target.value)} 
      />
         <input 
            type="text" 
            placeholder="Altura" 
            value={number}
             className="customer-input"
        onChange={(e) => setNumber(e.target.value)} 
      />
        <input 
            type="text" 
            placeholder="Ciudad" 
             className="customer-input"
            value={city}
        onChange={(e) => setCity(e.target.value)} 
      />
            {response.map((i, index)=>(
            <div key={i.id}className="menu-item" >
              <img className="menu-image" src={i.image} alt={i.name}/>
              <div className="menu-details">
              <p className="menu-name">{i.name}</p>
              <p className="menu-price">${i.price}</p>
              <button className="menu-order-button" onClick={() => sendOrder(i)}>Pedir este producto</button>
              </div>
              </div>
              ))
              }
              </div>
            ):(
              <p className="bot-response">{response}</p>
            )}
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className="chat-input"
          onKeyPress={enterButton}
          placeholder="Consulta horario o nuestro menu"
        />
        <button className="send-button" onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
