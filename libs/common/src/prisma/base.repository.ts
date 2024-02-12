import { Prisma, PrismaClient } from '@prisma/client';
import { FindManyDto } from './dto/find-many.dto';
import { FindUniqueDto } from './dto/find-unique.dto';
import { PrismaException } from './exception';

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected model: Prisma.ModelName;

  constructor(model: Prisma.ModelName) {
    this.prisma = new PrismaClient();
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.prisma[this.model].create({ data });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    try {
      return await this.prisma[this.model].update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async deleteById(id: number): Promise<T> {
    try {
      return await this.prisma[this.model].delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error)
    }
  }

  async findUnique({
    uniqueField,
    uniqueFieldValue,
    include,
  }: FindUniqueDto): Promise<T | null> {
    try {
      return await this.prisma[this.model].findUnique({
        where: { [uniqueField]: uniqueFieldValue },
        include,
      });
    } catch (error) {
      throw new PrismaException(error)
    }
  }

  async findById(id: number, include?: object): Promise<T | null> {
    try {
      return await this.prisma[this.model].findUnique({
        where: { id },
        include
      });
    } catch (error) {
      throw new PrismaException(error)
    }
  }

  async count(): Promise<number> {
    try {
      return await this.prisma[this.model].count();
    } catch (error) {
      throw new PrismaException(error)
    }
  }

  async findMany({
    baseQueryFindManyDto,
    include,
    where,
  }: FindManyDto): Promise<T[] | any> {
    const { skip, take, sortByCreatedAt } = baseQueryFindManyDto;

    try {
      const data = await this.prisma[this.model].findMany({
        take,
        skip,
        where,
        include,
        orderBy: {
          createdAt: sortByCreatedAt,
        },
      });

      const totalData = await this.prisma[this.model].count({
        where,
      });

      return { totalData, [this.model]: data };
    } catch (error) {
      throw new PrismaException(error)
    }
  }

  async executeRawQuery(query: string) {
    try {
      return await this.prisma.$executeRaw(Prisma.raw(`${query}`));
    } catch (error) {
      throw new PrismaException(error)
    }
  }
}
