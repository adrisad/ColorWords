// En tu archivo de rutas
import express from 'express';
import { WordController } from './word.controller';
import { wordService } from './word.service';

const router = express.Router();

const wordServiceInstance = new wordService();
const wordController = new WordController(wordServiceInstance);

router.post('/', wordController.createNewWord.bind(wordController));
router.get('/', wordController.getByAll.bind(wordController));
router.put('/:id', wordController.editarWord.bind(wordController));
router.delete('/:id', wordController.deleteOfWord.bind(wordController));

export default router;