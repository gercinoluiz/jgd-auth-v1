export type TAuthLogin = {
  email: string
  password: string
}

// UserRepository.ts
export abstract class IUserRepository {
  abstract login(user: TAuthLogin): Promise<string>
}
