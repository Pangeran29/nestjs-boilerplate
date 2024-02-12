import { CanAccess } from '@app/common';
import { JwtAuthGuard, RoleGuard } from '@app/common/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RoleGuard)
@CanAccess('Admin')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() findAllUserDto: FindAllUserDto) {
    return await this.userService.findAll(findAllUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);

    return {
      message: "Success to delete item",
      data: user
    }
  }
}
