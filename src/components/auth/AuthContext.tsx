import { createContext, useContext, useState, type ReactNode } from 'react'
import { LoginException, RegisterException } from './AuthExceptions'
import type { AuthContextType, AuthData, FirebaseLoginError, FirebaseLoginSuccess, FirebaseRegisterError, FirebaseRegisterSuccess } from './AuthTypes'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthData | null>(null)

  async function login({email, password}: AuthData) {
    const response = await fetch(
      `${AUTH_API_URL}signInWithPassword?key=${import.meta.env.VITE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )

    const data: FirebaseLoginSuccess | FirebaseLoginError = await response.json()

    if ('error' in data) 
      throw new LoginException(data.error.message)
    
    sessionStorage.setItem('idToken', data.idToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
  }

  async function register({email, password}: AuthData): Promise<void> {
    const response = await fetch(
      `${AUTH_API_URL}signUp?key=${import.meta.env.VITE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )

    const data: FirebaseRegisterSuccess | FirebaseRegisterError = await response.json()
  
    if ('error' in data) 
      throw new RegisterException(data.error.message)
    
    sessionStorage.setItem('idToken', data.idToken)
    sessionStorage.setItem('refreshToken', data.refreshToken)
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
