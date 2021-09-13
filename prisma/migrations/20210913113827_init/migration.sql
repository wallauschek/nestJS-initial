-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nomeDoAluno" TEXT NOT NULL,
    "cpfDoAluno" TEXT,
    "nascimentoDoAluno" TIMESTAMP(3) NOT NULL,
    "emailDoAluno" TEXT,
    "telefoneDoAluno" TEXT,
    "naturalidadeDoAluno" TEXT NOT NULL,
    "natalDoAluno" TEXT NOT NULL,
    "sexoDoAluno" TEXT NOT NULL,
    "logradouroDoAluno" TEXT NOT NULL,
    "numeroDoAluno" INTEGER NOT NULL,
    "complementoDoAluno" TEXT,
    "bairroDoAluno" TEXT NOT NULL,
    "municipioDoAluno" TEXT NOT NULL,
    "cepDoAluno" TEXT NOT NULL,
    "ufDoAluno" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "Token"("refreshToken");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
