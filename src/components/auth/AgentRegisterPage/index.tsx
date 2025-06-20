import { toast } from "sonner";
import { useAuth } from "../AuthContext";
import { RegisterException } from "../AuthExceptions";
import AgentRegisterForm from "../AgentRegisterForm";

export default function AgentRegisterPage() {
  const { register } = useAuth()

  async function handleLogin(data: { login: string, password: string }) {
    try {
      await register({ login: data.login })
      toast.success('Registro realizado com sucesso!')
    } catch (err) {
      if (err instanceof RegisterException) {
        toast.error(err.message)
      } else {
        toast.error('Erro inesperado ao tentar registrar no sistema.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Cadastrar</h1>
        <AgentRegisterForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
