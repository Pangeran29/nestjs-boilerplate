import { RecordNotFoundException } from '@app/common';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

export type User = any;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async findUserByUsername(username: string) {
    return await this.userRepository.findUnique({
      uniqueField: 'username',
      uniqueFieldValue: username,
    });
  }

  async create(createUserDto: CreateUserDto | RegisterDto) {
    return await this.userRepository
      .create(createUserDto);
  }

  async findAll(findAllUserDto: FindAllUserDto) {
    return await this.userRepository
      .findAll(findAllUserDto);
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .findById(id);

    if (!user) {
      throw new RecordNotFoundException();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.userRepository
      .update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.userRepository
      .deleteById(id);
  }
}
