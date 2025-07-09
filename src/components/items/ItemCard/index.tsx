import { useState } from "react";
import type { ItemCardProps, RetrievedItem } from "../ItemTypes";
import { useRetrievedItems } from "../RetrievedItemContext";
import { useItems } from "../ItemContext";
import { Button } from "@/components/ui/button";
import { RetrieveItemModal } from "../RetrieveItemModal";
import { ItemDetailsModal } from "../ItemDetailsModal";

export const ItemCard = ({ item, onEdit, onDeleted, editable = false }: ItemCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [retrieveOpen, setRetrieveOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { deleteItem } = useItems();
  const { addRetrievedItem } = useRetrievedItems();

  const handleRetrieve = async (retrieved: RetrievedItem) => {
    await addRetrievedItem(retrieved);
    await deleteItem(item.id);
  };

  return (
    <>
      <div
        className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between cursor-pointer"
        onClick={() => setDetailsOpen(true)}
      >
        <div>
          {/* ✅ Mostra a imagem se houver */}
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.description}
              className="w-full h-40 object-cover rounded mb-3"
            />
          )}
          <h2 className="font-semibold text-lg">{item.description}</h2>
          <p className="text-xs mt-1">{new Date(item.createdAt).toLocaleString()}</p>
        </div>

        {editable && (
          <div className="mt-3 flex gap-2 self-end">
            <Button variant="outline" size="sm" onClick={() => onEdit?.(item)}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setConfirmOpen(true)}>
              Excluir
            </Button>
            <Button size="sm" onClick={() => setRetrieveOpen(true)}>
              Retirar
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
                <Button variant="destructive" onClick={async () => {
                  setConfirmOpen(false);
                  await onDeleted?.(item.id);
                }}>Excluir</Button>
              </div>
            </div>
          </div>
        )}

        <RetrieveItemModal
          item={item}
          open={retrieveOpen}
          onClose={() => setRetrieveOpen(false)}
          onRetrieve={handleRetrieve}
        />
      </div>

      <ItemDetailsModal
        item={item}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
};
