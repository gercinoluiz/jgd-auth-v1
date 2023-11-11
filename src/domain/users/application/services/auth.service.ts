import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  IUser,
  IUserRepository,
  UserProvider,
} from '../repositories/users.repository'
import { compare } from 'bcryptjs'
import { TAuthLogin } from '../repositories/auth.repository'
import { JwtService } from '@nestjs/jwt'
import { checkAuthProvider } from '@/infra/ultils/checkAuthProvider'
import { pickFields } from '@/infra/mappers/userResponse.mapper'

// TODO: apply RateLimiter

interface IAuthResponse {
  access_token: string
  user: IUser | unknown
}

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwt: JwtService,
  ) {}

  async login({
    email,

    password,

    token_provider,

    provider,
  }: TAuthLogin): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.findByEmail(email)

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    if (provider && existingUser?.provider !== provider) {
      throw new UnauthorizedException('1. Invalid credentials.')
    }

    // TODO: verify to chanche this to a injectable service

    if (provider === UserProvider.GOOGLE && token_provider) {
      const autencity = await checkAuthProvider.google(token_provider)

      if (!autencity) {
        throw new ConflictException('Invalid token')
      }
    }

    if (!provider && password) {
      const comparedPassword = await compare(password, existingUser.password)

      if (!comparedPassword) {
        throw new UnauthorizedException('2. Invalid credentials.')
      }
    }

    if (!provider && !password) {
      throw new ConflictException('Password is required')
    }

    // Create a nestJS rate limiter to prevent brute force attacks

    const accessToken = this.jwt.sign({ sub: existingUser.id })

    return {
      access_token: accessToken,
      user: pickFields(existingUser, [
        'email',
        'name',
        'id',
        'photo',
        'mobile',
        'postalCode',
        'lastName',
        'city',
        'country',
        'street',
        'status',
        'state',
        'role',
        'number',
      ]),
    }
  }
}
