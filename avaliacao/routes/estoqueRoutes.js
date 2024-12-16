import { Router } from 'express';
const router = Router();
import { adicionarProduto, listarProdutos, atualizarProduto, removerProduto } from '../controllers/estoqueController';

// Produtos
router.post('/produto', adicionarProduto);
router.get('/produto', listarProdutos);
router.put('/produto/:id', atualizarProduto);
router.delete('/produto/:id', removerProduto);

export default router;
