import { PrismaClient } from "@prisma/client";
import { Estado, Task } from "../../generated/prisma";
import { BadRequestException, NotFoundException } from "@nestjs/common";

const prisma = new PrismaClient();
interface EditTaskInput{
    texto?: string;
    estado?: Estado;
}
export class taskService {
    async createTask(texto: string, estado: Estado = Estado.Nueva): Promise<Task> {
        if (!texto || !texto.trim()) {
            throw new Error('El texto es obligatorio.');
        }
        const task = await prisma.task.create({
            data: {
                texto: texto.trim(),
                estado,
            },
        });
        return task;
    }
    async editTask(id: number, input: EditTaskInput): Promise<Task> {
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
            return await prisma.task.update({ where: { id }, data });
        } catch (e: any) {
            if (e.code === 'P2025') throw new Error(`Task ${id} no existe.`);
            throw e;
        }
    }
    async deleteTask(id: number): Promise<Task> {
        if (!id || id <= 0) throw new BadRequestException('Id inválido.');
        try {
            return await prisma.task.delete({ where: { id } });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException(`Task con id ${id} no existe.`);
            throw e;
        }
    }
    async getTaskById(id: number): Promise<Task> {
        if (!id || id <= 0) throw new Error('Id inválido.');
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new Error(`Task ${id} no existe.`);
        return task;
    }

    async getAllTasks(): Promise<Task[]> {
        return prisma.task.findMany({ orderBy: { id: 'asc' } });
    }
}