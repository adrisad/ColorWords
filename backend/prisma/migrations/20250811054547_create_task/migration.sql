-- CreateEnum
CREATE TYPE "public"."Estado" AS ENUM ('Nueva', 'Aprendiendo', 'Conocida', 'Maestria');

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "estado" "public"."Estado" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
