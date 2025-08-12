import { Request, Response } from "express";
import { Estado } from "../../generated/prisma";
import { wordService } from "./word.service";

interface word{
    texto: string;
    estado: Estado;
}

export class WordController {
    constructor(private serviceWord: wordService) { }
    async createNewWord(req: Request<{}, {}, word>, res: Response) {
        const { texto, estado } = req.body;

        if (!texto || texto.trim() === "") {
            return res.status(400).json({ error: "El campo 'texto' es obligatorio" });
        }
        if (!Object.values(Estado).includes(estado)) {
            return res.status(400).json({ error: `El campo 'estado' debe ser uno de: ${Object.values(Estado).join(", ")}` });
        }

        const newWord = await this.serviceWord.createWord(texto, estado);
        return res.status(201).json(newWord);
    }
    async getByAll(req: Request, res: Response) {
        const words = await this.serviceWord.getAllWords();
        return res.json(words);
    }
    async editarWord(req: Request<{ id: string }, {}, word>, res: Response) {
        const word = await this.serviceWord.editWord(Number(req.params.id), req.body)
        return res.json(word)
    }
    async deleteWord(req: Request<{ id: string }, {}, word>, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número válido' });
        }
        const deletedWord = await this.serviceWord.deleteWord(id);
        if (!deletedWord) {
            return res.status(404).json({ error: 'Palabra no encontrada' });
        }
        return res.status(200).json({ message: 'Palabra eliminada correctamente' });
    }

}