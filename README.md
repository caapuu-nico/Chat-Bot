# ChatBot

Este es un proyecto de un ChatBot básico para un restaurante que permite a los usuarios consultar el menú, hacer pedidos y recibir respuestas a preguntas frecuentes como los horarios de apertura. El backend está construido con **Node.js** y **MongoDB**, mientras que el frontend utiliza **React**.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

- **Node.js**: [Descargar aquí](https://nodejs.org/)
- **MongoDB**: [Descargar aquí](https://www.mongodb.com/try/download/community) (puedes usar MongoDB Atlas si prefieres una solución en la nube)
- **Git** (opcional): [Descargar aquí](https://git-scm.com/)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

### 1. Clona este repositorio

Usa el siguiente comando para clonar el repositorio en tu máquina local:
bash
https://github.com/caapuu-nico/Chat-Bot/

### 2 Ve al directorio del proyecto

cd Chat-Bot

### 3 Ve al directorio del proyecto

Instala todas las dependencias del backend y frontend usando el siguiente comando:

npm install o npm i

### 4 Configuración de MongoDB

Asegúrate de que MongoDB esté corriendo en tu máquina local. Si estás usando MongoDB en la nube (por ejemplo, MongoDB Atlas), debes modificar la conexión en el archivo server.js:

mongoose.connect("mongodb://127.0.0.1/chatbotdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

### 5 Ejecuta el backend

nodemon
npm run dev

### 6 Ejecuta el frontend

npm start

### 6 Uso del ChatBot
Ahora deberías poder interactuar con el chatbot desde la interfaz gráfica. Puedes:

## Consultar el menú
Colocando la palabra "Menu" se abre el catalogo



## Hacer pedidos
Llenando el formulario de cliente pdemos hacer un pedido 




## Consultar los horarios del restaurante
Prueba con diferentes mensajes en tu chatbot, como:

"¿Están abiertos?"
"Están?"
"Abiertos?"
"Horario de atención"
"¿Cuál es el horario?"



### 7 Endpoints de la API

Traer todo el menu
GET /menu

Traer menu por nombre
GET /menu?name="nombre del producto"

GET /pedidos
Traer todos los pedidos realizados



Crear un pedido
POST /pedidos
Creamos un pedido nuevo

{
	"products": [
    {
      "productId":"677fb848ec5f8c7122e1f65e",
      "quantity": 2
    },{
			 "productId":"677fb849ec5f8c7122e1f661",
      "quantity": 1
		}
  ],
  "customerName":"Cliente de prueba",
	"street": "Casacuberta",
	"number":423,
	"city":"Moron"
  
}
}

### 8 Pruebas

Puedes correr algunas pruebas básicas del backend utilizando Jest o Mocha. Asegúrate de tener configurado el entorno de pruebas y usar mocks para la base de datos, si es necesario.
