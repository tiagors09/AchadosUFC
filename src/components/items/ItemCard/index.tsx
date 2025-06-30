import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import type { ItemCardProps } from "../ItemTypes"

export const ItemCard = ({ item, onEdit, onDeleted, editable = false }: ItemCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = () => setConfirmOpen(true)

  const confirmDelete = async () => {
    setConfirmOpen(false)
    try {
      await onDeleted?.(item.id)
    } catch {
      toast.error('Erro ao excluir o item.')
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-lg">{item.description}</h2>
        <p className="text-xs mt-1">{new Date(item.createdAt).toLocaleString()}</p>
      </div>

      {editable && (
        <div className="mt-3 flex gap-2 self-end">
          <Button variant="outline" size="sm" onClick={() => onEdit?.(item)}>
            Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Excluir
          </Button>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmar exclusão</h3>
            <p>Tem certeza que deseja excluir este item?</p>
            <div className="mt-6 flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={confirmDelete}>Excluir</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
