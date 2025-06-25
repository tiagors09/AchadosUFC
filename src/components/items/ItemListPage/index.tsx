import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { ItemData, UploadedItem } from '../ItemTypes'
import { useItems } from '../ItemContext'
import ItemModal from '../ItemModal'
import { toast } from 'sonner'
import { ItemCard } from '../ItemCard'

export default function ItemListPage() {
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
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Itens Perdidos</h1>
        <Button onClick={handleAdd}>Adicionar Item</Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDeleted={handleDelete}
          />
        ))}
      </div>

      {/* Pagination controls reservados para depois */}
      <div className="flex justify-center gap-4 mt-8">
        <Button variant="secondary" disabled>Anterior</Button>
        <Button variant="secondary" disabled>Próxima</Button>
      </div>

      {/* Modal para adicionar/editar item */}
      <ItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editData}
        onSubmit={handleSubmit}
        triggerLabel="" // não será usado com prop `open`
      />
    </div>
  )
}
