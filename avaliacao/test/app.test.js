import request from "supertest";
import { app } from "../app";
import { sequelize } from "../models/database";
import { Produto } from "../models/produto";
import { Categoria } from "../models/categoria";
import { Estoque } from "../models/estoque";

beforeAll(async () => {
    await sequelize.sync({ force: true });
    const categoria = await Categoria.create({ nome: "Eletrônicos" });
    const produto = await Produto.create({ nome: "Celular", preco: 1200.0, quantidade: 50, categoriaId: categoria.id });
    await Estoque.create({ produtoId: produto.id, quantidade: 50 });
  });

  
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset the database before tests
  });
  
  afterAll(async () => {
    await sequelize.close(); // Close the database connection
  });
  
  // Test suite for Categoria
  describe('Categoria Module', () => {
    let createdCategoryId;
  
    test('Deve criar uma nova categoria com sucesso', async () => {
      const response = await request(app)
        .post('/categorias')
        .send({ nome: 'Eletrônicos' });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe('Eletrônicos');
      createdCategoryId = response.body.id;
    });
  
    test('Deve listar todas as categorias', async () => {
      const response = await request(app).get('/categorias');
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
    });
  
    test('Deve atualizar uma categoria existente', async () => {
      const response = await request(app)
        .put(`/categorias/${createdCategoryId}`)
        .send({ nome: 'Eletrodomésticos' });
  
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Eletrodomésticos');
    });
  
    test('Deve remover uma categoria existente', async () => {
      const response = await request(app).delete(`/categorias/${createdCategoryId}`);
  
      expect(response.status).toBe(204);
  
      const checkResponse = await request(app).get('/categorias');
      expect(checkResponse.body.find((cat) => cat.id === createdCategoryId)).toBeUndefined();
    });
  });
  
  // Test suite for Produto
  describe('Produto Module', () => {
    let createdProductId;
    let categoryId;
  
    beforeAll(async () => {
      // Create a category for products
      const categoryResponse = await request(app)
        .post('/categorias')
        .send({ nome: 'Informática' });
  
      categoryId = categoryResponse.body.id;
    });
  
    test('Deve criar um novo produto com sucesso', async () => {
      const response = await request(app)
        .post('/produtos')
        .send({
          nome: 'Notebook',
          quantidade: 10,
          preco: 5000,
          categoriaId,
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe('Notebook');
      createdProductId = response.body.id;
    });
  
    test('Deve listar todos os produtos', async () => {
      const response = await request(app).get('/produtos');
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
    });
  
    test('Deve atualizar um produto existente', async () => {
      const response = await request(app)
        .put(`/produtos/${createdProductId}`)
        .send({ nome: 'Laptop', quantidade: 15 });
  
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Laptop');
    });
  
    test('Deve remover um produto existente', async () => {
      const response = await request(app).delete(`/produtos/${createdProductId}`);
  
      expect(response.status).toBe(204);
  
      const checkResponse = await request(app).get('/produtos');
      expect(checkResponse.body.find((prod) => prod.id === createdProductId)).toBeUndefined();
    });
  });
  
  // Test suite for Estoque
  describe('Estoque Module', () => {
    let createdStockId;
    let productId;
  
    beforeAll(async () => {
      // Create a product for stock
      const productResponse = await request(app)
        .post('/produtos')
        .send({
          nome: 'Teclado',
          quantidade: 50,
          preco: 200,
          categoriaId: 1,
        });
  
      productId = productResponse.body.id;
    });
  
    test('Deve criar um novo registro de estoque com sucesso', async () => {
      const response = await request(app)
        .post('/estoque')
        .send({ produtoId: productId, quantidade: 20 });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      createdStockId = response.body.id;
    });
  
    test('Deve listar todos os registros de estoque', async () => {
      const response = await request(app).get('/estoque');
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
    });
  
    test('Deve atualizar um registro de estoque existente', async () => {
      const response = await request(app)
        .put(`/estoque/${createdStockId}`)
        .send({ quantidade: 30 });
  
      expect(response.status).toBe(200);
      expect(response.body.quantidade).toBe(30);
    });
  
    test('Deve remover um registro de estoque existente', async () => {
      const response = await request(app).delete(`/estoque/${createdStockId}`);
  
      expect(response.status).toBe(204);
  
      const checkResponse = await request(app).get('/estoque');
      expect(checkResponse.body.find((stock) => stock.id === createdStockId)).toBeUndefined();
    });
  });
  