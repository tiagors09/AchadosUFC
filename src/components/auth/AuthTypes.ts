export type AuthData = {
  email: string,
  password: string
}

export type UserPayload = {
  user_id: string
  email: string
  exp: number
  iat: number
  [key: string]: unknown
}

export type AuthContextType = {
  idToken: string | null
  refreshToken: string | null
  user: UserPayload | null // payload decodificado do token
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  logout: () => void
  updateTokens: (idToken: string, refreshToken: string, user: UserPayload) => void
  initialized: boolean
}

export type FirebaseRegisterSuccess = {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export type FirebaseRegisterError = {
  error: {
    code: number
    message: string
    errors: Array<{ message: string; domain: string; reason: string }>
  }
}

export type FirebaseLoginSuccess = FirebaseRegisterSuccess

export type FirebaseLoginError = FirebaseRegisterError

export type AuthServiceInitResult = {
  idToken: string
  refreshToken: string
  user: UserPayload
} | null
