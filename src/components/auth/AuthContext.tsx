import { createContext, useContext, useState, type ReactNode } from 'react'
import { LoginException, RegisterException } from './AuthExceptions'

type AuthData = {
  login: string
}

type AuthContextType = {
  user: AuthData | null
  login: (data: AuthData) => Promise<void>
  register: (data: AuthData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_API_URL = 'https://sua-api-ou-firebase.com'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthData | null>(null)

  async function login(data: AuthData) {
    try {
      // Simulação de requisição (substitua pela real com fetch/axios/etc)
      const isValid = data.login === 'admin123'

      if (!isValid) {
        throw new LoginException('Login ou senha inválidos.')
      }

      // Simulação de sucesso
      setUser({ login: data.login })
    } catch (err) {
      if (err instanceof LoginException) throw err
      throw new LoginException('Erro inesperado no login.')
    }
  }

  async function register(data: AuthData) {
    try {
      const alreadyExists = data.login === 'admin123'

      if (alreadyExists) {
        throw new RegisterException('Esse login já está em uso.')
      }

      // Simulação de sucesso
      setUser({ login: data.login })
    } catch (err) {
      if (err instanceof RegisterException) throw err
      throw new RegisterException('Erro inesperado no cadastro.')
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return context
}
