import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaException } from '@app/common/prisma/prisma.exception';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string) {
    try {
      return await this.prismaService.account.findUnique({
        where: { username },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.account.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async create(createAccountDto: CreateAccountDto) {
    try {
      await this.prismaService.$transaction(async (tsx) => {
        const { clinicId, ...data } = createAccountDto;
        const account = await tsx.account.create({
          data,
        });

        return { account };
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    try {
      return await this.prismaService.account.update({
        where: { id },
        data: updateAccountDto,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.account.findMany({});
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.account.delete({ where: { id } });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
