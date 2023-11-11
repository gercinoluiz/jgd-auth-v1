import {
  CreateUserDTO,
  IUser,
  IUserRepository,
  UpdateUserDTO,
} from '@/domain/users/application/repositories/users.repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<Partial<IUser>> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name || '',
        email: user.email,
        password: user.password,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        role: user.role,
        provider: user?.provider,
        photo: user.photo,
        mobile: user.mobile,
        street: user.street,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
      },
    })
    return createdUser as IUser
  }

  async getById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })

    return user as IUser
  }

  async getAll(): Promise<IUser[]> {
    const user = await this.prisma.user.findMany()
    return user as IUser[]
  }

  async updateById(id: string, updates: UpdateUserDTO): Promise<IUser | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updates,
    })

    return updatedUser as IUser
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user as IUser
  }
}
