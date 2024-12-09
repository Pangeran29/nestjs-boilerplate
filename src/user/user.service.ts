import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaException } from '@app/common/exception';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prismaService.user.create({ data: user });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async update(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prismaService.user.findFirst({
        where: { email },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
