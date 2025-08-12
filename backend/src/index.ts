// src/index.ts
import express, { Application, Request, Response } from 'express';
import routerWord from './module/words/word.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express con TypeScript funcionando 🚀');
});

app.use('/words',routerWord);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
