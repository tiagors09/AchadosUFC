import { Button } from "@/components/ui/button"
import { ItemCard } from "../ItemCard"
import type { ItemData, UploadedItem } from "../ItemTypes"
import { toast } from "sonner"
import { useState } from "react"
import { useItems } from "../ItemContext"
import ItemModal from "../ItemModal"

interface Props {
  editable?: boolean
}

export default function ItemListPage({ editable = false }: Props) {
  const { items, uploadItem, updateItem, deleteItem, getItems } = useItems()
  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState<UploadedItem | null>(null)

  function handleAdd() {
    setEditData(null)
    setModalOpen(true)
  }

  function handleEdit(item: UploadedItem) {
    setEditData(item)
    setModalOpen(true)
  }

  async function handleSubmit(data: ItemData) {
    if (editData) {
      await updateItem(editData.id, data)
    } else {
      await uploadItem(data)
    }
    setModalOpen(false)
  }

  async function handleDelete(id: string) {
    try {
      await deleteItem(id)
      await getItems()
      toast.success('Item excluído com sucesso!')
    } catch {
      toast.error('Erro ao excluir o item.')
    }
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Itens Perdidos</h1>
        {editable && <Button onClick={handleAdd}>Adicionar Item</Button>}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item: UploadedItem) => (
          <ItemCard
            key={item.id}
            item={item}
            editable={editable}
            onEdit={editable ? handleEdit : undefined}
            onDeleted={editable ? handleDelete : undefined}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button variant="secondary" disabled>Anterior</Button>
        <Button variant="secondary" disabled>Próxima</Button>
      </div>

      {editable && (
        <ItemModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={editData}
          onSubmit={handleSubmit}
          triggerLabel=""
        />
      )}
    </div>
  )
}
