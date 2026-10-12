-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CapturedPokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainerId" TEXT NOT NULL,
    "pokeApiId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "tipos" TEXT NOT NULL,
    "hpBase" INTEGER NOT NULL,
    "ataqueBase" INTEGER NOT NULL,
    "defesaBase" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CapturedPokemon_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
