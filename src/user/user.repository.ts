import { BaseRepository, PrismaException } from '@app/common';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindAllUserDto } from './dto/find-all-user.dto';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('User');
  }

  async findAll(findAllUserDto: FindAllUserDto) {
    const {
      skip, take, sortByCreatedAt
    } = findAllUserDto;

    try {
      const totalUser = await this.prisma.user.count({});

      const user = await this.prisma.user.findMany({
        skip,
        take,
        orderBy: [
          { createdAt: sortByCreatedAt },
        ]
      });

      return { totalUser, user };
    } catch (error) {
      throw new PrismaException(error);
    }
  }

}
