import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Aluno } from '../entities/aluno.entity';

export class CreateAlunoDto extends Aluno {
  @IsString()
  nomeDoAluno: string;

  @IsString()
  @IsOptional()
  cpfDoAluno?: string;

  @IsString()
  nascimentoDoAluno: Date;

  @IsEmail()
  @IsOptional()
  emailDoAluno?: string;

  @IsString()
  @IsOptional()
  telefoneDoAluno?: string;

  @IsString()
  naturalidadeDoAluno: string;

  @IsString()
  natalDoAluno: string;

  @IsString()
  sexoDoAluno: string;

  @IsString()
  logradouroDoAluno: string;

  @IsNumber()
  numeroDoAluno: number;

  @IsString()
  @IsOptional()
  complementoDoAluno?: string;

  @IsString()
  bairroDoAluno: string;

  @IsString()
  municipioDoAluno: string;

  @IsString()
  cepDoAluno: string;

  @IsString()
  ufDoAluno: string;
}
