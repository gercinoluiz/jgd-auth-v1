import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaUserRepository } from './prisma/repositories/prisma-users-repository'
import { IUserRepository } from '@/domain/users/application/repositories/users.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, IUserRepository],
})
export class DatabaseModule {}
