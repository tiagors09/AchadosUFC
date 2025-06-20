export class LoginException extends Error {
  constructor(message = 'Falha no login') {
    super(message)
    this.name = 'LoginException'
  }
}

export class RegisterException extends Error {
  constructor(message = 'Falha no cadastro') {
    super(message)
    this.name = 'RegisterException'
  }
}
