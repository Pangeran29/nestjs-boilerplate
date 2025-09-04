import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PrismaModule } from '@app/common';
import { AccountController } from './account.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AccountService],
  exports: [AccountService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [AccountController],
})
export class AccountModule {}
