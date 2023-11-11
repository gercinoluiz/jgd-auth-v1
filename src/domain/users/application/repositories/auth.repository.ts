export type TAuthLogin = {
  email: string
  password?: string
  token_provider?: string
  provider?: string
}

// UserRepository.ts
export abstract class IUserRepository {
  abstract login(user: TAuthLogin): Promise<string>
}
