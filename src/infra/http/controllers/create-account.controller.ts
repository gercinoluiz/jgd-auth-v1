import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { CreateUserService } from '@/domain/users/application/services/create-account.service'
import { AuthService } from '@/domain/users/application/services/auth.service'

const createBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().optional(),
  provider: z.string().optional(),
  token_provider: z.string().optional(),
})

type CreateAccountBodySchema = z.infer<typeof createBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private createUserService: CreateUserService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    // eslint-disable-next-line camelcase
    const { name, email, password, provider, token_provider } = body

    const user = await this.createUserService.execute(
      {
        name,
        email,
        password,
        provider,
      },
      token_provider,
    )

    const { access_token } = await this.authService.login({
      email,
      password,
      provider,
      token_provider,
    })

    return { user, access_token }
  }
}
