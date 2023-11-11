-- CreateEnum
CREATE TYPE "UserProvider" AS ENUM ('GOOGLE', 'FACEBOOK', 'GITHUB', 'APPLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photo" TEXT,
ADD COLUMN     "provider" "UserProvider";
