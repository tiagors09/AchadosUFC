import type { AuthServiceInitResult, FirebaseLoginSuccess, FirebaseLoginError, UserPayload } from './AuthTypes';

class AuthService {
  private AUTH_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY = import.meta.env.VITE_API_KEY;

  private LOCALSTORAGE_ID_TOKEN = 'idToken';
  private LOCALSTORAGE_REFRESH_TOKEN = 'refreshToken';

  /**
   * Decodifica o payload de um JWT e retorna o objeto UserPayload.
   * @param {string} token - O token JWT a ser decodificado.
   * @returns {UserPayload | null} O payload decodificado do usuário, ou null se inválido.
   */
  private decodeJwtPayload(token: string): UserPayload | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as UserPayload;
    } catch {
      return null;
    }
  }


  /**
   * Inicializa o serviço de autenticação recuperando tokens do localStorage.
   * Decodifica o idToken para obter o payload do usuário.
   * @returns {Promise<AuthServiceInitResult>} Um objeto contendo idToken, refreshToken e user, ou null se não houver dados válidos.
   */
  async initialize(): Promise<AuthServiceInitResult> {
    // Obter dados de autenticação da LocalStorage.
    const idToken = localStorage.getItem(this.LOCALSTORAGE_ID_TOKEN);
    const refreshToken = localStorage.getItem(this.LOCALSTORAGE_REFRESH_TOKEN);
    if (!idToken || !refreshToken) return null;
    // Obter dados do usuário.
    const user = this.decodeJwtPayload(idToken);
    if (!user) return null;
    return { idToken, refreshToken, user };
  }

  /**
   * Realiza o login do usuário utilizando email e senha.
   * Faz uma requisição para a API do Firebase Authentication, armazena os tokens no localStorage
   * e retorna os dados do usuário decodificados do idToken.
   *
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<{ idToken: string, refreshToken: string, user: UserPayload }>} 
   *          Um objeto contendo o idToken, refreshToken e o payload do usuário.
   * @throws {Error} Se a autenticação falhar ou o token for inválido.
   */
  async signIn(email: string, password: string): Promise<{ idToken: string, refreshToken: string, user: UserPayload }> {
    // Requisição de login.
    const response = await fetch(
      `${this.AUTH_API_URL}signInWithPassword?key=${this.API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      }
    );
    const data: FirebaseLoginSuccess | FirebaseLoginError = await response.json();
    if ('error' in data) throw new Error(data.error.message);
    // Armezanar na LocalStorage.
    localStorage.setItem(this.LOCALSTORAGE_ID_TOKEN, data.idToken);
    localStorage.setItem(this.LOCALSTORAGE_REFRESH_TOKEN, data.refreshToken);
    // Obter dados do usuário.
    const user = this.decodeJwtPayload(data.idToken);
    if (!user) throw new Error('Token inválido');
    return { idToken: data.idToken, refreshToken: data.refreshToken, user };
  }

  /**
   * Verifica se o idToken está próximo de expirar e, se necessário, faz o refresh do token.
   * Se o token ainda for válido por mais de 2 minutos, retorna os dados atuais.
   * Caso contrário, faz uma requisição para atualizar o token e retorna os novos dados.
   *
   * @param {string} idToken - O token JWT atual.
   * @param {string} refreshToken - O refresh token atual.
   * @returns {Promise<{ idToken: string, refreshToken: string, user: UserPayload } | null>}
   *          Os novos tokens e payload do usuário, ou null se não for possível atualizar.
   */
  async refreshTokenIfNeeded(idToken: string | null, refreshToken: string | null): Promise<{ idToken: string, refreshToken: string, user: UserPayload } | null> {
    if (!idToken || !refreshToken) return null;
    // Obter dados de expiração do token.
    const payload = this.decodeJwtPayload(idToken);
    if (!payload || !payload.exp) return null;
    const now = Math.floor(Date.now() / 1000);
    // Se o token expira em menos de 2 minutos, faz refresh.
    if (payload.exp - now > 120) {
      return { idToken, refreshToken, user: payload };
    }
    // Faz refresh.
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${this.API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
    const data = await response.json();
    if (!response.ok || !data.id_token) {
      this.logout();
      return null;
    }
    // Atualização na LocalStorage.
    localStorage.setItem(this.LOCALSTORAGE_ID_TOKEN, data.id_token);
    localStorage.setItem(this.LOCALSTORAGE_REFRESH_TOKEN, data.refresh_token);
    // Atualizar usuário.
    const user = this.decodeJwtPayload(data.id_token);
    if (!user) {
      this.logout();
      return null;
    }
    return { idToken: data.id_token, refreshToken: data.refresh_token, user };
  }

  /**
   * Remove os tokens de autenticação do localStorage, efetivamente deslogando o usuário.
   */
  logout() {
    // Limpar dados na LocalStorage.
    localStorage.removeItem(this.LOCALSTORAGE_ID_TOKEN);
    localStorage.removeItem(this.LOCALSTORAGE_REFRESH_TOKEN);
  }
}

export default new AuthService();