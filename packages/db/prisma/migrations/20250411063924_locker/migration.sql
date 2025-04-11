/*
  Warnings:

  - You are about to drop the column `lockedPin` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `name` to the `LockedBalance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "lockedPin";

-- AlterTable
ALTER TABLE "LockedBalance" ADD COLUMN     "currentValue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "interestRate" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lockerPin" INTEGER NOT NULL DEFAULT 0;
