import { Module } from '@nestjs/common'
import { AuthenticateAccountController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'

import { DatabaseModule } from '../database/database.module'
import { CreateUserService } from '@/domain/users/application/services/create-account.service'
import { AuthService } from '@/domain/users/application/services/auth.service'
import { updateAccountController } from './controllers/update-user.controller'
import { UpdateUserService } from '@/domain/users/application/services/update-user.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateAccountController,
    updateAccountController,
  ],
  providers: [CreateUserService, AuthService, UpdateUserService],
  imports: [DatabaseModule],
})
export class HttpModule {}
