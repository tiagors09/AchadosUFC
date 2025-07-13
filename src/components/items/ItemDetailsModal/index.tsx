import { Button } from '@/components/ui/button'
import type { ItemDetailsModalProps, RetrievedItem, UploadedItem } from '../ItemTypes'

function isRetrievedItem(item: UploadedItem | RetrievedItem): item is RetrievedItem {
  return (item as RetrievedItem).retrievalDate !== undefined && (item as RetrievedItem).studentRegistration !== undefined;
}

export function ItemDetailsModal({ item, open, onClose }: ItemDetailsModalProps) {
  if (!open || !item) return null

  const displayItem = isRetrievedItem(item) ? item.item : item;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes do Item</h2>

        <p><strong>Descrição:</strong> {displayItem.description}</p>
        <p><strong>Laboratório:</strong> {displayItem.lab || '-'}</p>
        <p><strong>Sala:</strong> {displayItem.room || '-'}</p>
        <p><strong>Bloco:</strong> {displayItem.block || '-'}</p>
        <p><strong>Horário da entrega:</strong> {new Date(displayItem.dropTime).toLocaleDateString()}</p>
        <p><strong>Criado em:</strong> {new Date(displayItem.createdAt).toLocaleString()}</p>

        {isRetrievedItem(item) && (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Detalhes da Retirada</h3>
            <p><strong>Data de Recuperação:</strong> {new Date(item.retrievalDate).toLocaleString()}</p>
            <p><strong>Agente da Retirada:</strong> {item.retrievedByUserEmail}</p>
            <p><strong>Matrícula do Discente:</strong> {item.studentRegistration}</p>
            <p><strong>Curso do Discente:</strong> {item.studentCourse}</p>
            { item.observationNote && <p><strong>Observação:</strong> {item.observationNote}</p> }
          </>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="cursor-pointer" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </div>
  )
}
