const request = require('supertest');
const app = require("../server");
const mongoose = require("mongoose");
const Product = require("../models/Product");  // Suponiendo que tienes un modelo Product

describe('POST /pedidos', () => {
  let productId;

  // Antes de cada prueba, crea un producto en la base de datos
  beforeAll(async () => {
    const product = new Product({
      name: "Menu ejecutivo",
      price: 15000,
      image: "https://example.com/sushi.jpg"
    });
    await product.save();
    productId = product._id;
  });

  // Después de cada prueba, limpiar la base de datos
  afterAll(async () => {
    await Product.deleteMany({});
    mongoose.connection.close();
  });

  it("Debería crear un nuevo pedido", async () => {
    const orderData = {
      customerName: "Juan Pérez",
      product: [
        { productId: productId, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post("/api/pedidos")
      .send(orderData);
    
    // Verificar que el pedido fue creado correctamente
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Pedido creado exitosamente");
    expect(response.body.order).toHaveProperty("products");
    expect(response.body.order).toHaveProperty("customerName", "Juan Pérez");
  });
});