import { toast } from "sonner"
import { useAuth } from "../AuthContext"
import AgentRegisterForm from "../AgentRegisterForm"
import { useNavigate } from "react-router"

export default function AgentRegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleRegister(data: { email: string, password: string }) {
    try {
      await register(data.email, data.password)
      toast.success('Registro realizado com sucesso!')
      navigate('/auth/login')
    } catch (err) {
      if (err instanceof Error) {
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
          <AgentRegisterForm onRegister={handleRegister} />
      </div>
    </div>
  )
}
