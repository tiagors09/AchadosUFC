const errors = new Map<string, string>([
  [
    'EMAIL_EXISTS',
    'Oh no! Parece que este endereço de e-mail já está sendo usado por outra conta. Que tal tentar um e-mail diferente?'
  ],
  [
    'OPERATION_NOT_ALLOWED',
    'Oopsie! O login com senha está desativado para este projeto. Vamos encontrar outra maneira de entrar!'
  ],
  [
    'TOO_MANY_ATTEMPTS_TRY_LATER',
    'Uh-oh! Detectamos atividades incomuns e precisamos bloquear temporariamente todas as solicitações deste dispositivo. Não se preocupe, tente novamente mais tarde!'
  ],
  [
    'EMAIL_NOT_FOUND',
    'Ah, que pena! Não encontramos nenhum registro de usuário correspondente a este identificador. Será que você digitou tudo corretamente?'
  ],
  [
    'INVALID_PASSWORD',
    'Aww, a senha que você digitou não está correta ou talvez o usuário não tenha definido uma ainda. Vamos tentar outra vez!'
  ],
  [
    'USER_DISABLED',
    'Oh não! Parece que esta conta de usuário foi desabilitada por um administrador. Vamos resolver isso juntos!'
  ],
  [
    'INVALID_LOGIN_CREDENTIALS',
    'Parece que você digitou alguma coisa errada!'
  ],
])

export class LoginException extends Error {
  constructor(message: string) {
    super(errors.get(message))
    this.name = 'LoginException'
  }
}

export class RegisterException extends Error {
  constructor(message: string) {
    super(errors.get(message))
    this.name = 'RegisterException'
  }
}
