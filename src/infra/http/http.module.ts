import { Module } from '@nestjs/common'
import { AuthenticateAccountController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

import { DatabaseModule } from '../database/database.module'
import { CreateUserService } from '@/domain/users/application/services/create-account.service'
import { AuthService } from '@/domain/users/application/services/auth.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateUserService, AuthService],
  imports: [DatabaseModule],
})
export class HttpModule {}
