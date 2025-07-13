import { Button } from "@/components/ui/button"
import { ItemCard } from "../ItemCard"
import type { ItemData, UploadedItem, RetrievedItem } from "../ItemTypes"
import { toast } from "sonner"
import { useState } from "react"
import { useItems } from "../ItemContext"
import ItemModal from "../ItemModal"
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/AuthContext'
import { useRetrievedItems } from "../RetrievedItemContext";
import { RetrieveItemModal } from "../RetrieveItemModal";

interface Props {
  editable?: boolean;
  showRetrievedItemsSection?: boolean;
}

export default function ItemListPage({ editable = false, showRetrievedItemsSection = true }: Props) {
  const { items, uploadItem, updateItem, deleteItem, getItems, markItemAsRetrieved } = useItems()
  const { retrievedItems, addRetrievedItem, deleteRetrievedItem } = useRetrievedItems();
  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState<UploadedItem | null>(null)
  const [retrieveModalOpen, setRetrieveModalOpen] = useState(false);
  const [itemToRetrieve, setItemToRetrieve] = useState<UploadedItem | null>(null);
  const [activeSection, setActiveSection] = useState<'lost' | 'retrieved'>('lost'); // New state for active section
  const [confirmDeleteRetrievedOpen, setConfirmDeleteRetrievedOpen] = useState(false); // State for retrieved delete confirmation
  const [itemToDeleteRetrieved, setItemToDeleteRetrieved] = useState<RetrievedItem | null>(null); // Item to delete
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleAdd() {
    setEditData(null)
    setModalOpen(true)
  }

  function handleEdit(item: UploadedItem) {
    setEditData(item)
    setModalOpen(true)
  }

  async function handleSubmit(data: ItemData, file?: File) {
    if (editData) {
      await updateItem(editData.id, data)
    } else {
      await uploadItem(data, file)
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

  function handleMarkAsRetrieved(item: UploadedItem) {
    setItemToRetrieve(item);
    setRetrieveModalOpen(true);
  }

  async function handleRetrieveSubmit(retrievedData: RetrievedItem) {
    try {
      await addRetrievedItem(retrievedData);
      await markItemAsRetrieved(retrievedData.item.id);
      toast.success('Item marcado como retirado com sucesso!');
      setRetrieveModalOpen(false);
    } catch (error) {
      console.error("Error marking item as retrieved:", error);
      toast.error('Erro ao marcar item como retirado.');
    }
  }

  const handleDeleteRetrieved = async (id: string) => {
    const item = retrievedItems.find(item => item.id === id);
    if (item) {
      setItemToDeleteRetrieved(item);
      setConfirmDeleteRetrievedOpen(true);
    }
  };

  async function handleConfirmDeleteRetrieved() {
    if (itemToDeleteRetrieved) {
      try {
        await deleteRetrievedItem(itemToDeleteRetrieved.id);
        toast.success('Item recuperado excluído com sucesso!');
        setConfirmDeleteRetrievedOpen(false);
        setItemToDeleteRetrieved(null);
      } catch (error) {
        console.error("Error deleting retrieved item:", error);
        toast.error('Erro ao excluir item recuperado.');
      }
    }
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Itens Perdidos</h1>
        <div className="flex items-center gap-4">
          {editable ? 
            <Button className="cursor-pointer" onClick={() => logout()}>Logout</Button> :
            <Button className="cursor-pointer" onClick={() => navigate('/agent/item/list')}>Acessar portaria</Button>
          }
          {editable && <Button className="cursor-pointer" onClick={handleAdd}>Adicionar Item</Button>}
        </div>
      </header>

      {editable && showRetrievedItemsSection && (
        <div className="flex justify-center gap-4 mb-6">
          <Button
            className="cursor-pointer"
            variant={activeSection === 'lost' ? 'default' : 'outline'}
            onClick={() => setActiveSection('lost')}
          >
            Itens Perdidos
          </Button>
          <Button
            className="cursor-pointer"
            variant={activeSection === 'retrieved' ? 'default' : 'outline'}
            onClick={() => setActiveSection('retrieved')}
          >
            Itens Recuperados
          </Button>
        </div>
      )}

      {activeSection === 'lost' && (
        <>
          <h2 className="text-xl font-semibold mb-4">Itens Perdidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item: UploadedItem) => (
              <ItemCard
                key={item.id}
                item={item}
                editable={editable}
                onEdit={editable ? handleEdit : undefined}
                onDeleted={editable ? handleDelete : undefined}
              >
                {editable && (
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => handleMarkAsRetrieved(item)}
                  >
                    Marcar como Recuperado
                  </Button>
                )}
              </ItemCard>
            ))}
          </div>
        </>
      )}

      {activeSection === 'retrieved' && showRetrievedItemsSection && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Itens Recuperados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {retrievedItems.length > 0 ? (
              retrievedItems.map((retrievedItem) => (
                <ItemCard
                  key={retrievedItem.id}
                  item={retrievedItem}
                  editable={editable}
                  onDeleted={editable ? handleDeleteRetrieved : undefined}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">Nenhum item recuperado ainda.</p>
            )}
          </div>
        </>
      )}

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

      {editable && itemToRetrieve && (
        <RetrieveItemModal
          item={itemToRetrieve}
          open={retrieveModalOpen}
          onClose={() => setRetrieveModalOpen(false)}
          onRetrieve={handleRetrieveSubmit}
        />
      )}

      {editable && confirmDeleteRetrievedOpen && itemToDeleteRetrieved && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir este item?</p>
            <div className="mt-6 flex justify-end gap-4">
              <Button className="cursor-pointer" variant="outline" onClick={() => setConfirmDeleteRetrievedOpen(false)}>Cancelar</Button>
              <Button className="cursor-pointer" variant="destructive" onClick={handleConfirmDeleteRetrieved}>Excluir</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
