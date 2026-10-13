-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapturedPokemon" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "pokeApiId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "tipos" TEXT NOT NULL,
    "hpBase" INTEGER NOT NULL,
    "ataqueBase" INTEGER NOT NULL,
    "defesaBase" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CapturedPokemon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CapturedPokemon" ADD CONSTRAINT "CapturedPokemon_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
