export type AuthData = {
  email: string,
  password: string
}

export type AuthContextType = {
  user: AuthData | null
  login: (data: AuthData) => Promise<void>
  register: (data: AuthData) => Promise<void>
  logout: () => void
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
