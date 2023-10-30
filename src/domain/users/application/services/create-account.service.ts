import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  CreateUserDTO,
  IUser,
  IUserRepository,
  UserProvider,
} from '../repositories/users.repository'
import { hash } from 'bcryptjs'
import { pickFields } from '@/infra/mappers/userResponse.mapper'
import { checkAuthProvider } from '@/infra/ultils/checkAuthProvider'

@Injectable()
export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    {
      email,
      name,
      password,
      city,
      country,
      firstName,
      lastName,
      mobile,
      postalCode,
      role,
      state,
      street,
      provider,
      photo,
    }: CreateUserDTO,
    token?: string,
  ): Promise<Partial<IUser>> {
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    // TODO: verify to chanche this to a injectable service

    if (provider === UserProvider.GOOGLE && token) {
      const autencity = await checkAuthProvider.google(token)

      if (!autencity) {
        throw new ConflictException('Invalid token')
      }
    }

    const userReturn = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      city,
      country,
      firstName,
      lastName,
      mobile,
      postalCode,
      role,
      state,
      street,
      photo,
      provider,
    })

    if (!userReturn) {
      throw new InternalServerErrorException('Error')
    }

    const newUser = pickFields(userReturn, ['name', 'city', 'email'])

    return newUser
  }
}
