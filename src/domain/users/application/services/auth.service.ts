import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IUserRepository } from '../repositories/users.repository'
import { compare } from 'bcryptjs'
import { TAuthLogin } from '../repositories/auth.repository'
import { JwtService } from '@nestjs/jwt'

// TODO: apply RateLimiter

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwt: JwtService,
  ) {}

  async login({
    email,

    password,
  }: TAuthLogin): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(email)

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    // Create a nestJS rate limiter to prevent brute force attacks

    const comparedPassword = await compare(password, existingUser.password)

    if (!comparedPassword) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = this.jwt.sign({ sub: existingUser.id })

    return accessToken
  }
}
