/*
  Warnings:

  - A unique constraint covering the columns `[originalId]` on the table `MostSearched` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MostSearched_originalId_key" ON "MostSearched"("originalId");
