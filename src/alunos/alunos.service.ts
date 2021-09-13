import { Injectable } from '@nestjs/common';
import { Prisma, Aluno } from '@prisma/client';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAlunoDto): Promise<Aluno> {
    const { nascimentoDoAluno } = dto;
    const dataNascimento = new Date(nascimentoDoAluno);
    const data: Prisma.AlunoCreateInput = {
      ...dto,
      nascimentoDoAluno: dataNascimento,
    };

    return this.prisma.aluno.create({
      data,
    });
  }

  async findAll(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany();
  }

  async findOne(id: string): Promise<Aluno | null> {
    return this.prisma.aluno
      .findUnique({
        where: { id },
      })
      .then((aluno) => {
        if (!aluno) {
          throw new EntityNotFoundError(`Aluno with id #${id} was not found.`);
        }
        return aluno;
      });
  }

  async getPublishedAlunos(): Promise<Aluno[]> {
    return this.prisma.aluno.findMany();
  }

  async update(id: string, dto: UpdateAlunoDto): Promise<Aluno> {
    this.findOne(id);
    const data: Prisma.AlunoUpdateInput = {
      ...dto,
    };

    return this.prisma.aluno.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Aluno> {
    this.findOne(id);
    return this.prisma.aluno.delete({ where: { id } });
  }
}
