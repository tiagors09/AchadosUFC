export interface AgentLoginData {
  email: string
  password: string
}

export type AgentLoginFormProps = { onSubmit: (data: AgentLoginData) => Promise<void> }

export interface AgentRegisterData {
  email: string
  password: string
  confirmPassword: string
}

export type AgentRegisterFormProps = { onRegister: (data: AgentRegisterData) => Promise<void> }
