import { toast } from "sonner"
import AgentRegisterForm from "../AgentRegisterForm"
import { useNavigate } from "react-router"

export default function AgentRegisterPage() {
  const navigate = useNavigate()

  async function handleRegister() {
    toast.success('Registro realizado com sucesso!')
    navigate('/auth/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Cadastrar</h1>
          <AgentRegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  )
}
