import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { encrypt, JwtAuthGuard, Role, TResponseApi } from '@app/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from '@app/common/guard/role.guard';
import { ERole } from '@prisma/client';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(ERole.Admin)
  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<TResponseApi> {
    {
      const account = await this.accountService.findByUsername(
        createAccountDto.username,
      );
      if (account) {
        throw new BadRequestException(
          'Cannot use this username since it is already used by another account',
        );
      }
    }

    createAccountDto.password = await encrypt(
      createAccountDto.password,
    );

    const account = await this.accountService.create(createAccountDto);
    return {
      message: 'Success to create account',
      data: account,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(ERole.Admin)
  @Get()
  async findAll(): Promise<TResponseApi> {
    const account = await this.accountService.findAll();
    return {
      message: 'Success to find all account',
      data: account,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(ERole.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TResponseApi> {
    const account = await this.accountService.findOne(+id);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return {
      message: 'Success to find one account',
      data: account,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(ERole.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<TResponseApi> {
    {
      const account = await this.accountService.findOne(+id);
      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (updateAccountDto.username) {
        const account = await this.accountService.findByUsername(
          updateAccountDto.username,
        );
        if (account && account.id !== +id) {
          throw new NotFoundException(
            'Cannot use this username since it is already used by another account',
          );
        }
      }
    }

    if (updateAccountDto.password) {
      updateAccountDto.password = await encrypt(
        updateAccountDto.password,
      );
    }

    const account = await this.accountService.update(+id, updateAccountDto);

    return {
      message: 'Success to update account',
      data: account,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(ERole.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TResponseApi> {
    {
      const account = await this.accountService.findOne(+id);
      if (!account) {
        throw new NotFoundException('Account not found');
      }
    }

    const account = await this.accountService.remove(+id);

    return {
      message: 'Success to remove account',
      data: account,
    };
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/')
  async updateByUser(
    @Body() updateAccountDto: UpdateAccountDto,
    @Request() req
  ): Promise<TResponseApi> {
    {
      const sub = req.user.sub;
      const account = await this.accountService.findOne(+sub);
      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (updateAccountDto.username) {
        const account = await this.accountService.findByUsername(
          updateAccountDto.username,
        );
        if (account && account.id !== +sub) {
          throw new NotFoundException(
            'Cannot use this username since it is already used by another account',
          );
        }
      }
    }

    if (updateAccountDto.password) {
      updateAccountDto.password = await encrypt(
        updateAccountDto.password,
      );
    }

    const sub = req.user.sub;

    delete updateAccountDto.role;
    delete updateAccountDto.clinicId;
    delete updateAccountDto.fcmToken;

    const account = await this.accountService.update(+sub, updateAccountDto);

    return {
      message: 'Success to update account',
      data: account,
    };
  }

}
