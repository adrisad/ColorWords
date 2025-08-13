import { Request, Response } from "express";
import { Estado } from "../../generated/prisma";
import { wordService } from "./word.service";

interface word{
    texto: string;
    estado: Estado;
}

export class WordController {
    private serviceWord: wordService;
    
    constructor(serviceWord?: wordService) {
        this.serviceWord = serviceWord || new wordService();
    }
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
    async deleteOfWord(req: Request<{ id: string }>, res: Response) {
        const word = await this.serviceWord.deleteWord(Number(req.params.id))
        return res.json(word);
    }
}