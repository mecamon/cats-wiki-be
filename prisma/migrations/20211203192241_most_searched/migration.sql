-- CreateTable
CREATE TABLE "MostSearched" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timesSearched" INTEGER NOT NULL
);
