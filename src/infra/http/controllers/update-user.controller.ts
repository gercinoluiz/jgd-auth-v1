import {
  Body,
  Controller,
  HttpCode,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { AuthService } from '@/domain/users/application/services/auth.service'
import { UpdateUserService } from '@/domain/users/application/services/update-user.service'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

const updateBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  mobile: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  photo: z.string().optional(),
  provider: z.string().optional(),
  token_provider: z.string().optional(),
  number: z.string().optional(),
})

type UpdateAccountBodySchema = z.infer<typeof updateBodySchema>

@Controller('/accounts')
export class updateAccountController {
  constructor(
    private updateUserService: UpdateUserService,
    private authService: AuthService,
  ) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateBodySchema))
  async handle(@Body() body: UpdateAccountBodySchema) {
    const {
      name,
      email,
      password,
      firstName,
      lastName,
      mobile,
      street,
      city,
      state,
      postalCode,
      country,
      photo,
      number,
    } = body

    const user = await this.updateUserService.execute({
      name,
      email,
      password,
      firstName,
      lastName,
      mobile,
      street,
      city,
      state,
      postalCode,
      country,
      photo,
      number,
    })

    // const accessToken = await this.authService.login({ email, password })

    return { user }
  }
}
