import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  UpdateUserDTO,
  IUser,
  IUserRepository,
} from '../repositories/users.repository'
import { pickFields } from '@/infra/mappers/userResponse.mapper'

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    name,

    city,
    country,
    firstName,
    lastName,
    mobile,
    postalCode,
    role,
    state,
    street,
    number,
    photo,
  }: UpdateUserDTO): Promise<Partial<IUser>> {
    if (!email) {
      throw new ConflictException('Email is required')
    }

    const existingUser = await this.userRepository.findByEmail(email)

    if (!existingUser) {
      throw new ConflictException('No user found')
    }

    const userReturn = await this.userRepository.updateById(existingUser.id, {
      email,
      name,
      number,
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
    })

    if (!userReturn) {
      throw new InternalServerErrorException('Error')
    }

    

    const newUser = pickFields(userReturn, [
      'name',
      'city',
      'email',
      'photo',
      'country',
      'firstName',
      'lastName',
      'mobile',
      'postalCode',
      'role',
      'state',
      'street',
      'photo',
      'number',
    ])

    return newUser
  }
}
