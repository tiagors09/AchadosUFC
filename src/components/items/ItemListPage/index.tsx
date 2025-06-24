import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { ItemData, UploadedItem } from '../ItemTypes'
import { useItems } from '../ItemContext'
import ItemModal from '../ItemModal'

export default function ItemListPage() {
  const { items, uploadItem, updateItem } = useItems()
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
    /*
    if (editData) {
      await updateItem(editData.id, data)
    } else {
      await uploadItem(data)
    }
    setModalOpen(false)
    */
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Itens Encontrados</h1>
        <Button onClick={handleAdd}>Adicionar Item</Button>
      </header>

      {/* Espaço reservado para lista futura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            // key={item.id}
            className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.description}</h2>
              <p className="text-muted-foreground text-sm">{item.location}</p>
              <p className="text-xs mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 self-end"
              onClick={() => handleEdit(item)}
            >
              Editar
            </Button>
          </div>
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
