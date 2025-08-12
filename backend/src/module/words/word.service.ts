import { PrismaClient } from "@prisma/client";
import { Estado, Word } from "../../generated/prisma";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const prisma = new PrismaClient();
interface EditWordInput{
    texto?: string;
    estado?: Estado;
}
export class wordService {
    async createWord(texto: string, estado: Estado = Estado.Nueva): Promise<Word> {
        if (!texto || !texto.trim()) {
            throw new Error('El texto es obligatorio.');
        }
        const cleanText = texto.trim();
        const existingWord = await prisma.word.findFirst({
            where: {
                texto: {
                    equals: cleanText,
                    mode: 'insensitive',
                },
            },
        });
        if (existingWord) {
            throw new Error(`La palabra "${cleanText}" ya existe.`);
        }
        return prisma.word.create({
            data: {
                texto: cleanText,
                estado,
            },
        });
    }
    async editWord(id: number, input: EditWordInput): Promise<Word> {
        if (!id || id <= 0) throw new Error('Id inválido.');
        if (!input || (input.texto == null && input.estado == null)) {throw new Error('Nada para actualizar.');}

        const data: Partial<{ texto: string; estado: Estado }> = {};
        if (typeof input.texto === 'string') {
            const trimmed = input.texto.trim();
            if (!trimmed) throw new Error('El texto no puede quedar vacío.');
            data.texto = trimmed;
        }
        if (input.estado != null) data.estado = input.estado;

        try {
            return await prisma.word.update({ where: { id }, data });
        } catch (e: any) {
            if (e.code === 'P2025') throw new Error(`Task ${id} no existe.`);
            throw e;
        }
    }
    async deleteWord(id: number): Promise<Word> {
        if (!id || id <= 0) throw new BadRequestException('Id inválido.');
        try {
            return await prisma.word.delete({ where: { id } });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException(`Task con id ${id} no existe.`);
            throw e;
        }
    }
    async getWordById(id: number): Promise<Word> {
        if (!id || id <= 0) throw new Error('Id inválido.');
        const task = await prisma.word.findUnique({ where: { id } });
        if (!task) throw new Error(`Task ${id} no existe.`);
        return task;
    }

    async getAllWords(): Promise<Word[]> {
        return prisma.word.findMany({ orderBy: { id: 'asc' } });
    }
    async isWordAlreadyCreated(texto: string){
        const normalizado = texto.trim();
        const res = await prisma.word.findFirst({
            where:{
                texto:{
                    equals: normalizado,
                    mode: 'insensitive'
                }
            }
        })
        return res!=null
    }
}