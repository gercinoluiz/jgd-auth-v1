/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_author_id_fkey";

-- DropTable
DROP TABLE "Question";

-- DropEnum
DROP TYPE "Provider";
