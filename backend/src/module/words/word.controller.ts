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
}