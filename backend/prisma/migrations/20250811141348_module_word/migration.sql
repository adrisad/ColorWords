/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Task";

-- CreateTable
CREATE TABLE "public"."Word" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "estado" "public"."Estado" NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
