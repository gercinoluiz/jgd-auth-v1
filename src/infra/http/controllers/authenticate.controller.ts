import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { AuthService } from '@/domain/users/application/services/auth.service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateAccountBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateAccountController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateAccountBodySchema) {
    const { email, password } = body

    const accessToken = await this.authService.login({ email, password })

    return { access_token: accessToken }
  }
}
