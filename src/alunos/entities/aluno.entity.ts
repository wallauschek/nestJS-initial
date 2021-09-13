import { Prisma } from '@prisma/client';

export class Aluno implements Prisma.AlunoUncheckedCreateInput {
  id: string;
  nomeDoAluno: string;
  cpfDoAluno?: string;
  nascimentoDoAluno: Date;
  emailDoAluno?: string;
  telefoneDoAluno?: string;
  naturalidadeDoAluno: string;
  natalDoAluno: string;
  sexoDoAluno: string;
  logradouroDoAluno: string;
  numeroDoAluno: number;
  complementoDoAluno?: string;
  bairroDoAluno: string;
  municipioDoAluno: string;
  cepDoAluno: string;
  ufDoAluno: string;
}
