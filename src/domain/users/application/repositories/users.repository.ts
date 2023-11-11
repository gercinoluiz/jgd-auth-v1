// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum UserProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  APPLE = 'APPLE',
}

// User.ts
export interface IUser {
  id: string
  name: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  role?: UserRole
  status?: UserStatus
  createdAt?: Date
  updatedAt?: Date

  // Flattened contact info and address
  mobile?: string
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  photo?: string
  provider?: UserProvider
  number?: string
}

// UserDTOs.ts
export interface CreateUserDTO {
  name?: string
  email: string
  password?: string
  firstName?: string
  lastName?: string
  role?: UserRole

  // Flattened contact info and address
  mobile?: string
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string

  provider?: UserProvider | any
  photo?: string
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  role?: UserRole
  status?: UserStatus

  // Optional flattened contact info and address
  mobile?: string
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  number?: string
  photo?: string
}

// UserRepository.ts
export abstract class IUserRepository {
  abstract create(user: CreateUserDTO): Promise<Partial<IUser>>
  abstract getById(id: string): Promise<IUser | null>
  abstract getAll(): Promise<IUser[]>
  abstract updateById(id: string, updates: UpdateUserDTO): Promise<IUser | null>
  abstract deleteById(id: string): Promise<void>
  abstract findByEmail(email: string): Promise<IUser | null>
}
