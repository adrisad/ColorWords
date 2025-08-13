import express, {json, Application, Request, Response } from 'express';
import routerWord from './module/words/word.routes';
import cors from 'cors';
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/words',routerWord);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
