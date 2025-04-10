-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "lockedPin" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LockedBalance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "isLocked" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "maturityDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LockedBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LockedBalance_userId_key" ON "LockedBalance"("userId");

-- AddForeignKey
ALTER TABLE "LockedBalance" ADD CONSTRAINT "LockedBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
