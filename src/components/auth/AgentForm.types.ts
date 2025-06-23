export interface AgentLoginData {
  login: string
  password: string
}

export interface AgentRegisterData extends AgentLoginData {
  confirmPassword: string
}

export interface AgentLoginFormProps {
  onSubmit: (data: AgentLoginData) => void
}

export interface AgentRegisterFormProps {
  onSubmit: (data: AgentRegisterData) => void
}
