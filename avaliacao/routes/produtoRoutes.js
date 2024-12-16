import { Router } from 'express';
const router = Router();
import { adicionarProduto, listarProdutos, atualizarProduto, removerProduto } from '../controllers/produtoController';

// Rota para adicionar um novo produto
router.post('/produto', adicionarProduto);

// Rota para listar todos os produtos
router.get('/produto', listarProdutos);

// Rota para atualizar um produto específico
router.put('/produto/:id', atualizarProduto);

// Rota para remover um produto
router.delete('/produto/:id', removerProduto);

export default router;
