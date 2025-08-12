import { Router } from 'express';
import { WordController } from './word.controller';
import { wordService } from './word.service';

const routerWord = Router();
const Service = new wordService();
const Controller = new WordController(Service);

routerWord.post('/', (req, res) => Controller.createNewWord(req, res));
routerWord.get('/', (req, res) => Controller.getByAll(req, res));

export default routerWord;