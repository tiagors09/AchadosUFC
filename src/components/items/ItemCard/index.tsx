import { useState } from "react";
import type { ItemCardProps, RetrievedItem, UploadedItem } from "../ItemTypes";
import { Button } from "@/components/ui/button";
import { ItemDetailsModal } from "../ItemDetailsModal";

function isRetrievedItem(item: UploadedItem | RetrievedItem): item is RetrievedItem {
  return (item as RetrievedItem).retrievalDate !== undefined && (item as RetrievedItem).item !== undefined;
}

export const ItemCard = ({ item, onEdit, onDeleted, editable = false, children }: ItemCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);


  const displayItem = isRetrievedItem(item) ? item.item : item;

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    setDetailsOpen(false);
    if (onDeleted) {
      await onDeleted(item.id);
    }
  };

  return (
    <>
      <div
        className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          {displayItem.imageUrl && (
            <img
              src={displayItem.imageUrl}
              alt={displayItem.description}
              className="w-full h-40 object-cover rounded mb-3"
            />
          )}
          <h2 className="font-semibold text-lg">{displayItem.description}</h2>
          <p className="text-xs mt-1">{new Date(displayItem.createdAt).toLocaleString()}</p>
        </div>

        <div className="w-full mt-3 flex gap-2 self-end justify-center items-center flex-wrap">
          {editable && !isRetrievedItem(item) && (
            <Button
              className="w-[48%] cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(item as UploadedItem)}
            >
              Editar
            </Button>
          )}
          {editable && (
            <Button 
              className={`${isRetrievedItem(item) ? "w-full" : "w-[48%]"} cursor-pointer`} 
              variant="destructive" 
              size="sm" 
              onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(true);
              setDetailsOpen(false);
            }}>
              Excluir
            </Button>
          )}
          <Button 
            className="w-full cursor-pointer" 
            variant="outline" 
            size="sm" 
            onClick={() => setDetailsOpen(true)}
          >
            Ver Detalhes
          </Button>
          {children}
        </div>

        {confirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirmar exclusão</h3>
              <p>Tem certeza que deseja excluir este item?</p>
              <div className="mt-6 flex justify-end gap-4">
                <Button className="cursor-pointer" variant="outline" onClick={() => {
                  setConfirmOpen(false);
                  setDetailsOpen(false);
                }}>Cancelar</Button>
                <Button className="cursor-pointer" variant="destructive" onClick={handleConfirmDelete}>Excluir</Button>
              </div>
            </div>
          </div>
        )}

      </div>

      <ItemDetailsModal
        item={item}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
};
