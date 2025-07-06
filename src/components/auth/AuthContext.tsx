import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import AuthService from './AuthService';
import type { UserPayload } from './AuthTypes';

interface AuthContextType {
  idToken: string | null;
  refreshToken: string | null;
  user: UserPayload | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTokens: (idToken: string, refreshToken: string, user: UserPayload) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provedor de contexto de autenticação.
 * Inicializa o estado de autenticação e fornece métodos para login, logout e atualização de tokens.
 * @param {object} props - Propriedades do componente.
 * @param {ReactNode} props.children - Elementos filhos.
 * @returns {JSX.Element} O provedor de contexto de autenticação.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthContextType>({
    idToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => {},
    logout: () => {},
    updateTokens: () => {},
  });

  useEffect(() => {
    /**
     * Inicializa o estado de autenticação ao montar o componente.
     * Recupera tokens do localStorage e define o estado de autenticação.
     */
    AuthService.initialize().then(result => {
      if (result) {
        setAuth(prev => ({ ...prev, ...result, isAuthenticated: !!result.idToken, loading: false }));
      } else {
        setAuth(prev => ({ ...prev, loading: false }));
      }
    })
  }, []);

  /**
   * Realiza o login do usuário com email e senha.
   * Atualiza o estado de autenticação com os dados retornados do AuthService.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<void>}
   * @throws {Error} Se o login falhar.
   */
  const login = async (email: string, password: string) => {
    setAuth(prev => ({ ...prev, loading: true }));
    try {
      const result = await AuthService.signIn(email, password);
      setAuth(prev => ({ ...prev, ...result, isAuthenticated: !!result.idToken, loading: false }));
    } catch (error: unknown) {
      setAuth(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário.
   * Limpa os tokens do estado e do localStorage, e redireciona para a tela de login.
   */
  const logout = () => {
    AuthService.logout();
    setAuth(prev => ({
      ...prev,
      user: null,
      idToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
    }));
    navigate('/auth/login');
  }

  /**
   * Atualiza os tokens de autenticação e o usuário no estado.
   * @param {string} idToken - Novo idToken.
   * @param {string} refreshToken - Novo refreshToken.
   * @param {UserPayload} user - Novo payload do usuário.
   */
  const updateTokens = (idToken: string, refreshToken: string, user: UserPayload) => {
    setAuth(prev => ({ ...prev, idToken, refreshToken, user, isAuthenticated: !!idToken }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, updateTokens }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook para acessar o contexto de autenticação.
 * @returns {AuthContextType} O contexto de autenticação.
 * @throws {Error} Se usado fora do AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return context
}
