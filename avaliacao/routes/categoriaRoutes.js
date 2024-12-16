import { Router } from 'express';
const router = Router();
import { adicionarCategoria, listarCategorias, atualizarCategoria, removerCategoria } from '../controllers/categoriaController';

// Rota para adicionar uma nova categoria
router.post('/categoria', adicionarCategoria);

// Rota para listar todas as categorias
router.get('/categoria', listarCategorias);

// Rota para atualizar uma categoria específica
router.put('/categoria/:id', atualizarCategoria);

// Rota para remover uma categoria
router.delete('/categoria/:id', removerCategoria);

export default router;
