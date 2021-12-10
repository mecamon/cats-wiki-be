/*
  Warnings:

  - Added the required column `description` to the `MostSearched` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MostSearched" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "timesSearched" INTEGER NOT NULL
);
INSERT INTO "new_MostSearched" ("id", "image", "name", "originalId", "timesSearched") SELECT "id", "image", "name", "originalId", "timesSearched" FROM "MostSearched";
DROP TABLE "MostSearched";
ALTER TABLE "new_MostSearched" RENAME TO "MostSearched";
CREATE UNIQUE INDEX "MostSearched_originalId_key" ON "MostSearched"("originalId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
