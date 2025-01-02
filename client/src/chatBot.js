import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Obtener el menú al cargar la página
    axios.get('http://localhost:5001/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('Error al obtener el menú', err));
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = () => {
    if (message.toLowerCase() === 'menu') {
      // Mostrar el menú cuando se solicite
      setResponse(`Nuestro menú:\n${menu.map(item => `${item.name} - $${item.price}`).join('\n')}`);
    } else if (message.toLowerCase().startsWith('ordenar')) {
      // Tomar pedido cuando el usuario lo solicite
      const productName = message.split(' ')[1];
      const product = menu.find(item => item.name.toLowerCase() === productName.toLowerCase());

      if (product) {
        const newOrder = [...order, { product: product._id, name: product.name }];
        setOrder(newOrder);

        // Mandar pedido al servidor
        axios.post('http://localhost:5001/pedidos', { items: newOrder.map(item => ({ product: item.product, quantity: 1 })) })
          .then((res) => setResponse(`Pedido realizado: ${newOrder.map(item => item.name).join(', ')}`))
          .catch((err) => console.error('Error al realizar el pedido', err));
      } else {
        setResponse('Producto no encontrado en el menú.');
      }
    } else if (message.toLowerCase() === 'estan abiertos?') {
      axios.get("http://localhost:5001/abierto")
      .then((res)=>setResponse(res.data))
      .catch((err)=> console.error("Error al consultar horario", err))
    } 
    setMessage('');
  };
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
        <div className="messages">
          <p>{response}</p>
        </div>
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
